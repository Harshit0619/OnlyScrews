# OnlyScrews Production Caching Strategy

## Overview
This document outlines the comprehensive caching strategy implemented for OnlyScrews to improve SEO and load times on production.

## Caching Layers

### 1. **Browser & CDN Caching (Next.js Headers)**
Configured in `next.config.ts` with route-specific cache headers:

- **Homepage (`/`)**: 60 seconds CDN cache + 5 minutes stale-while-revalidate
- **Blog (`/blog/**`)**: 1 hour CDN cache + 24 hours stale-while-revalidate
- **Products (`/products/**`)**: 30 minutes CDN cache + 24 hours stale-while-revalidate
- **Categories (`/category/**`)**: 1 hour CDN cache + 24 hours stale-while-revalidate
- **Static Assets**: 1 year immutable cache
- **API Routes**: No browser cache (private), but allows CDN caching

**Cache Header Format:**
```
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=604800
```

- `s-maxage`: Time to cache on CDN/shared cache (Netlify)
- `stale-while-revalidate`: Allow serving stale content while revalidating in background
- `stale-if-error`: Serve stale content if origin is unreachable

### 2. **Incremental Static Regeneration (ISR)**
Set in page components using `export const revalidate = seconds`

#### Current ISR Configuration:
- **Homepage** (`app/page.tsx`): 60 seconds
- **Blog** (`app/blog/page.tsx`): 3600 seconds (1 hour)

#### To Add ISR to Dynamic Routes:
```typescript
// For product pages [id]/page.tsx
export const revalidate = 1800 // 30 minutes

// For category pages [slug]/page.tsx
export const revalidate = 3600 // 1 hour
```

### 3. **Image Caching**
Configured in `next.config.ts`:
- **TTL**: 1 year (31536000 seconds)
- **Formats**: AVIF and WebP for better compression
- **Device Sizes**: Optimized for responsive images

### 4. **Middleware Request Handling**
`middleware.ts` adds cache headers and handles redirects for:
- URL normalization
- Route-specific cache policies
- Security headers

### 5. **Netlify CDN Headers** (`netlify.toml`)
Additional server-side caching for:
- Images: 1 year immutable
- Static assets: 1 year immutable
- Sitemap: 1 hour with must-revalidate
- Robots.txt: 1 hour

## SEO Benefits

1. **Faster Load Times**: Cached pages serve instantly from CDN
2. **Better Core Web Vitals**: Reduced TTFB (Time To First Byte) improves LCP
3. **Reduced Server Load**: ISR pre-renders pages, reducing origin hits
4. **Fresh Content**: Stale-while-revalidate ensures freshness with background updates
5. **Improved Crawlability**: Faster pages = faster indexing by search engines

## API Route Caching Strategy

For API endpoints, use response headers:

```typescript
// app/api/products/route.ts
export async function GET(request: NextRequest) {
  const response = await fetchProducts()
  
  // For product lists (cacheable)
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  })
}
```

## Monitoring & Maintenance

### Check Cache Hit Ratio:
1. Go to Netlify Analytics
2. Look for cache hit percentage in CDN stats
3. Aim for >70% hit rate

### Clear Cache Manually:
```bash
# In Netlify Dashboard:
# Site Settings → Deployments → Purge Cache
```

### Adjust Revalidation Times:
- If content changes frequently: Reduce `revalidate` value
- If content is static: Increase `revalidate` value
- Monitor Google Search Console for crawl efficiency

## Deployment Checklist

- [x] Updated `next.config.ts` with caching headers
- [x] Enhanced `middleware.ts` with cache policies
- [x] Added ISR to homepage
- [x] Added ISR to blog page
- [ ] Add ISR to dynamic product pages: `app/products/[id]/page.tsx`
- [ ] Add ISR to dynamic category pages: `app/category/[slug]/page.tsx`
- [ ] Test with Chrome DevTools (Network tab)
- [ ] Verify headers in Netlify using `curl -I <url>`
- [ ] Monitor Core Web Vitals in Google Search Console

## Testing Cache Headers

```bash
# Test cache headers for different routes
curl -I https://onlyscrews.com/
curl -I https://onlyscrews.com/blog
curl -I https://onlyscrews.com/products/screws

# Look for Cache-Control headers in response
```

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| FCP (First Contentful Paint) | < 1.8s | Monitor |
| LCP (Largest Contentful Paint) | < 2.5s | Monitor |
| CLS (Cumulative Layout Shift) | < 0.1 | Monitor |
| TTFB (Time to First Byte) | < 0.6s | Monitor |

## Troubleshooting

### Content Not Updating?
- Check if ISR revalidation time has passed
- Purge cache manually in Netlify dashboard
- Check Netlify deployment logs

### Stale Content Showing?
- This is intentional with stale-while-revalidate
- Background fetch happens in parallel
- User sees cached version, server updates for next visitor

### Cache Headers Not Showing?
- Ensure build is deployed (check Netlify logs)
- Clear browser cache: Cmd+Shift+Delete
- Use incognito mode to test fresh cache

## References

- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [HTTP Cache Headers](https://web.dev/http-cache/)
- [ISR Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
