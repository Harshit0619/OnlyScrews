/**
 * API Caching Utilities for Production
 * Use these utilities to add caching headers to API routes
 */

import { NextResponse, NextRequest } from 'next/server'

/**
 * Cache policies for different content types
 */
export const CACHE_POLICIES = {
  // Homepage and landing pages - short cache for freshness
  homepage: {
    cacheControl: 'public, s-maxage=60, stale-while-revalidate=300, stale-if-error=86400',
    description: 'Homepage: 1 minute CDN + 5 min stale',
  },
  
  // Frequently updated product lists
  productList: {
    cacheControl: 'public, s-maxage=1800, stale-while-revalidate=86400, stale-if-error=604800',
    description: 'Product lists: 30 min CDN + 24hr stale',
  },
  
  // Individual product details
  productDetail: {
    cacheControl: 'public, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=604800',
    description: 'Product details: 1hr CDN + 24hr stale',
  },
  
  // Blog posts - stable content
  blog: {
    cacheControl: 'public, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=604800',
    description: 'Blog posts: 1hr CDN + 24hr stale',
  },
  
  // Categories - relatively stable
  category: {
    cacheControl: 'public, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=604800',
    description: 'Categories: 1hr CDN + 24hr stale',
  },
  
  // Images - very stable
  images: {
    cacheControl: 'public, max-age=31536000, immutable',
    description: 'Images: 1 year immutable',
  },
  
  // User-specific data - no caching
  noCache: {
    cacheControl: 'private, no-cache, no-store, must-revalidate',
    description: 'User data: No caching',
  },
  
  // Search results - moderate cache
  search: {
    cacheControl: 'public, s-maxage=900, stale-while-revalidate=3600',
    description: 'Search: 15 min CDN + 1hr stale',
  },
}

/**
 * Add cache headers to API response
 * @param data - The response data
 * @param policy - Cache policy key from CACHE_POLICIES
 * @returns NextResponse with appropriate cache headers
 */
export function createCachedResponse(
  data: unknown,
  policy: keyof typeof CACHE_POLICIES = 'productList'
) {
  const cachePolicy = CACHE_POLICIES[policy]
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': cachePolicy.cacheControl,
      'Content-Type': 'application/json',
      // Add ETag for better cache validation
      'ETag': `W/"${Buffer.from(JSON.stringify(data)).toString('base64').slice(0, 20)}"`,
    },
  })
}

/**
 * Handle conditional requests with ETag/Last-Modified
 * @param request - NextRequest object
 * @param lastModified - ISO date string when content was last modified
 * @returns 304 if cached version is fresh, otherwise null
 */
export function checkConditionalRequest(
  request: NextRequest,
  lastModified: string
): Response | null {
  const ifNoneMatch = request.headers.get('if-none-match')
  const ifModifiedSince = request.headers.get('if-modified-since')
  
  // If client has cached version and it matches, return 304 Not Modified
  if (ifModifiedSince) {
    const clientDate = new Date(ifModifiedSince).getTime()
    const serverDate = new Date(lastModified).getTime()
    
    if (clientDate >= serverDate) {
      return new NextResponse(null, { status: 304 })
    }
  }
  
  return null
}

/**
 * Wrap a data fetching function with caching
 * Useful for API routes that fetch from database
 */
export async function withCache<T>(
  fetchFn: () => Promise<T>,
  policy: keyof typeof CACHE_POLICIES = 'productList'
): Promise<[T, typeof CACHE_POLICIES[keyof typeof CACHE_POLICIES]]> {
  try {
    const data = await fetchFn()
    return [data, CACHE_POLICIES[policy]]
  } catch (error) {
    console.error('Cache fetch error:', error)
    throw error
  }
}

/**
 * Cache invalidation helper
 * Use in admin routes to purge specific cache entries
 */
export async function invalidateCache(paths: string[]) {
  // For Netlify: You'll need to call the Netlify API
  // This is a placeholder for future implementation
  
  console.log('Cache invalidation for paths:', paths)
  
  // TODO: Implement actual cache purge via Netlify API
  // POST to https://api.netlify.com/build_hooks/<BUILD_HOOK_ID>
  // or use Netlify Admin API to purge specific paths
}

/**
 * Example: Using in an API route
 * 
 * // app/api/products/route.ts
 * import { createCachedResponse, CACHE_POLICIES } from '@/lib/caching'
 * 
 * export async function GET(request: NextRequest) {
 *   const products = await db.product.findMany()
 *   return createCachedResponse(products, 'productList')
 * }
 */

export default {
  CACHE_POLICIES,
  createCachedResponse,
  checkConditionalRequest,
  withCache,
  invalidateCache,
}
