"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { BLOG_POSTS } from "./blogData";
import { COLORS } from "@/lib/theme";

const ALL_FILTERS = [
  "All posts",
  "Screws",
  "Bolts",
  "Washers",
  "Nylon",
  "Stainless Steel 304",
  "Industrial nuts and bolts",
  "Durable",
  "Guide",
  "DIY",
  "Corrosion resistance",
  "Precision Engineered fasteners",
  "hex head bolts",
  "Machine screws",
  "Spacers",
  "High-Tesile",
];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("All posts");


  const filteredPosts =
    activeFilter === "All posts"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) =>
          post.tags.some(
            (tag) =>
              tag.toLowerCase() === activeFilter.toLowerCase() ||
              post.category.toLowerCase() === activeFilter.toLowerCase()
          )
        );

  return (
    <div className="min-h-screen bg-white -pt-[150px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Blogs
        </h1>

        <div className="mb-12">
          <div className="flex flex-wrap gap-3 mb-4 items-start">
            <div className="flex items-center gap-1 pt-1">
              <FileText className="w-4 h-4 text-gray-700" strokeWidth={3} />
            </div>
            {ALL_FILTERS.slice(0, 9).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    isActive ? "text-black" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={
                    isActive ? { backgroundColor: COLORS.primary } : undefined
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            {ALL_FILTERS.slice(9).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    isActive ? "text-black" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={
                    isActive ? { backgroundColor: COLORS.primary } : undefined
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
