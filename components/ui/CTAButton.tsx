"use client";

import Link from "next/link";
import { COLORS, TYPOGRAPHY } from "@/lib/theme";

export default function CTAButton() {
  return (
    <Link
      href="/bulk-enquiry"
      className="inline-block px-8 py-3 rounded-md font-semibold transition-all duration-300"
      style={{
        backgroundColor: COLORS.primary,
        color: COLORS.black,
        fontFamily: TYPOGRAPHY.h4.fontFamily,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = COLORS.primaryHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = COLORS.primary;
      }}
    >
      Request Quote Now
    </Link>
  );
}
