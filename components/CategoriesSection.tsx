"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SPACING } from "@/lib/theme";
import { H2, Subtitle } from "./ui/Typography";
import StandardCard from "./ui/StandardCard";

const categories = [
  { id: 1, name: "Bolts", image: "/images/categories/bolts.png" },
  {
    id: 2,
    name: "Machine Screws",
    image: "/images/categories/machine-screws.png",
  },
  {
    id: 3,
    name: "Clinching Fasteners",
    image: "/images/categories/clinching-fasteners.png",
  },
  { id: 4, name: "Allen Screws", image: "/images/categories/allen-screws.png" },
  { id: 5, name: "Washers", image: "/images/Washers.png" },
  { id: 6, name: "Nylon", image: "/images/categories/nylon.png" },
  { id: 7, name: "Nuts", image: "/images/categories/nuts.png" },
  {
    id: 8,
    name: "PCB Fasteners",
    image: "/images/categories/pcb-fasteners.png",
  },
];

export default function CategoriesSection() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const offset = Math.round(lastScrollY * 0.25);
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
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2F61feb74e32ed4195a4cbd55149a401bd%2Fb66521bb13234db2b75617a0f01640df"
          alt="Categories background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.15,
          }}
          sizes="100vw"
        />
      </div>

      <div className={`${SPACING.container} ${SPACING.section.px}`}>
        <div className="text-center mb-10">
          <H2 className="mb-4">
            Your One-Stop Catalog for Every Fastening Need
          </H2>
          <Subtitle>
            From bolts and screws to high-performance nylon fasteners — all
            under one roof.
          </Subtitle>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${SPACING.gap.lg} justify-items-center`}
        >
          {categories.map((category) => (
            <StandardCard
              key={category.id}
              image={category.image}
              title={category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
