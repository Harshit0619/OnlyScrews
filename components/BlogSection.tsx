"use client";

import Link from "next/link";
import BlogCard from "./BlogCard";
import { BLOG_POSTS } from "@/app/blog/blogData";
import { H2, H3, Body } from "./ui/Typography";
import { COLORS } from "@/lib/theme";
import { useState } from "react";

export default function BlogSection() {
  // Show first 3 blog posts
  const featuredPosts = BLOG_POSTS.slice(0, 3);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <H2 className="mb-4" style={{ color: "rgb(17, 24, 39)" }}>
            Premium Fasteners & Hardware
          </H2>
          <Body className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Precision-engineered bolts, screws, and fasteners for every project.
            Quality you can trust, delivered fast.
          </Body>
          <Link
            href="/blog"
            className="inline-block text-white px-6 py-3 rounded-md font-semibold transition-colors"
            style={{
              backgroundColor: isHovering
                ? COLORS.primaryHover
                : COLORS.primary,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Explore Our Blog
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.primary }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <H3 className="mb-2">Precision Quality</H3>
            <Body className="text-gray-600">
              Every fastener meets rigorous quality standards for reliability
              and durability.
            </Body>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.primary }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <H3 className="mb-2">Fast Shipping</H3>
            <Body className="text-gray-600">
              Orders ship same day. Get the fasteners you need, when you need
              them.
            </Body>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.primary }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <H3 className="mb-2">Expert Guides</H3>
            <Body className="text-gray-600">
              Learn how to choose and install the right fasteners for your
              project.
            </Body>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="mb-8">
          <H3 className="mb-6">Blogs</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
