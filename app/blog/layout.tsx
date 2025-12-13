import { Metadata } from "next";

// Revalidate blog section every 1 hour for ISR
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog - Fastener Tips, Guides & Industry News | Screw Bazar",
  description:
    "Expert insights on fasteners, screws, bolts, and hardware. Learn installation techniques, material selection, maintenance tips, and industry best practices.",
  keywords: [
    "fastener blog",
    "screw installation guide",
    "bolt selection tips",
    "hardware maintenance",
    "fastener industry news",
    "DIY hardware tips",
    "construction fasteners",
  ],
  openGraph: {
    title: "Blog - Fastener Tips & Guides | Screw Bazar",
    description:
      "Expert insights and guides on fasteners, screws, bolts, and hardware",
    url: "https://www.screwbazar.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://www.screwbazar.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
