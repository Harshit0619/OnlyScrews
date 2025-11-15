"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SPACING, COLORS } from "@/lib/theme";
import { H1, H3, Body } from "./ui/Typography";
import StandardCard from "./ui/StandardCard";

const products = [
  { id: 1, name: "Nylon Spacers", image: "/images/products/nylon-spacers.png" },
  { id: 2, name: "Nylon Washers", image: "/images/products/nylon-washers.png" },
  { id: 3, name: "Nylon Nuts", image: "/images/products/nylon-nuts.png" },
  { id: 4, name: "Nylon Bolts", image: "/images/products/nylon-bolts.png" },
  { id: 5, name: "Nylon Machine Screws", image: "/images/products/nylon-machine-screws.png"},
];

export default function NylonRangeSection() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const offset = Math.round(lastScrollY * 0.3);
          bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-white ${SPACING.section.py}`}
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2F61feb74e32ed4195a4cbd55149a401bd%2Fb66521bb13234db2b75617a0f01640df"
          alt="Nylon background"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.15,
          }}
          sizes="100vw"
        />
      </div>

      <div className={`${SPACING.container} ${SPACING.section.px}`}>
        {/* Header */}
        <div className="mb-10">
          <H1 className="mb-4">Introducing Nylon Range</H1>
          <H3 className="mb-6 text-gray-800">
            Strong, Lightweight, and Durable for Demanding Application
          </H3>
          <div
            className="w-full mb-6"
            style={{ borderTop: `2px solid ${COLORS.black}` }}
          />
          <Body className="max-w-4xl">
            Our Nylon Fastener Range offers exceptional mechanical strength with
            minimal weight, making it ideal for high-performance industrial and
            electrical environments. Resistant to corrosion, moisture, and
            vibration, these components deliver long-lasting reliability where
            metal fasteners may fail.
          </Body>
        </div>

        {/* Product Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${SPACING.gap.lg} justify-items-center`}
        >
          {products.map((product) => (
            <StandardCard
              key={product.id}
              image={product.image}
              title={product.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
