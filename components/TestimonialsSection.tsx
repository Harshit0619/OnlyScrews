"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, CheckCircle } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { H2 } from "./ui/Typography";
import { COLORS } from "@/lib/theme";

const testimonials = [
  {
    rating: 5,
    title: "good for 3D printed parts",
    excerpt: "fit well. happy with the quality and price. Will order again.",
    customerName: "Clint Johny",
    timeAgo: "4 months ago",
    productImage:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop",
    productName: "M2.5 X 4mm Brass Thread Insert",
  },
  {
    rating: 5,
    title: "Great quality and reasonable price",
    excerpt: "Go for it. These are exactly what I needed for my project.",
    customerName: "CHANDAN KUMAR DAS",
    timeAgo: "4 months ago",
    productImage:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=200&h=200&fit=crop",
    productName: "M8 X 70mm Hex Socket Screw",
  },
  {
    rating: 5,
    title: "Great Quality Screws with Fast Delivery and Packing",
    excerpt:
      "The screws are of good quality. Fast delivery and excellent packing. Highly recommended!",
    customerName: "Vikash Oraon",
    timeAgo: "6 months ago",
    productImage:
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=200&h=200&fit=crop",
    productName: "M2 X 3mm Phillips Round Head Screw",
  },
  {
    rating: 5,
    title: "Good",
    excerpt: "Thank you, only screws team. Great products and service.",
    customerName: "Aditya electronics raju",
    timeAgo: "7 months ago",
    productImage:
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=200&h=200&fit=crop",
    productName: "M3 X 15mm Male to Female Spacer",
  },
  {
    rating: 5,
    title: "Excellent Service",
    excerpt:
      "Fast shipping and great quality products. Very satisfied with my purchase.",
    customerName: "Rahul Sharma",
    timeAgo: "5 months ago",
    productImage:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop",
    productName: "M4 X 8mm Brass Thread Insert",
  },
];

const TestimonialsSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(
              containerRef.current.scrollWidth -
                containerRef.current.clientWidth,
              scrollPosition + scrollAmount
            );

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <H2 className="text-gray-900 mb-4">Let customers speak for us</H2>
          <div className="flex justify-center items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm underline"
            >
              from 698 reviews
            </a>
            <CheckCircle
              className="w-5 h-5"
              style={{ color: COLORS.primary }}
            />
          </div>
        </div>

        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full shadow-lg p-2 border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: hoverLeft ? COLORS.primary : "white",
              borderColor: hoverLeft ? COLORS.primary : "#E5E7EB",
            }}
            onClick={() => scroll("left")}
            onMouseEnter={() => setHoverLeft(true)}
            onMouseLeave={() => setHoverLeft(false)}
            disabled={scrollPosition === 0}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth px-4"
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full shadow-lg p-2 border transition-colors"
            style={{
              backgroundColor: hoverRight ? COLORS.primary : "white",
              borderColor: hoverRight ? COLORS.primary : "#E5E7EB",
            }}
            onClick={() => scroll("right")}
            onMouseEnter={() => setHoverRight(true)}
            onMouseLeave={() => setHoverRight(false)}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
