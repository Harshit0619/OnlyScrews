import { Metadata } from "next";
import Footer from "../components/Footer";
import ContactButtons from "../components/FloatingButton";
import LandingPage from "../components/LandingPage";
import NylonRangeSection from "../components/NylonRangeSection";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedProductsSection from "../components/FeaturedProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import CTAButton from "../components/ui/CTAButton";

// Revalidate homepage every 60 seconds for freshness
export const revalidate = 60

export const metadata: Metadata = {
  title:
    "Screw Bazar - Premium Fasteners, Screws, Bolts & Hardware | OnlyScrews",
  description:
    "India's leading online fastener store. Shop high-quality screws, bolts, nuts, anchors, rivets, washers, spacers & more. SS304, MS, brass, nylon fasteners. Fast delivery across India.",
  keywords: [
    "screws online India",
    "buy fasteners online",
    "stainless steel screws",
    "machine screws",
    "hex bolts",
    "nylon fasteners",
    "industrial hardware",
    "self-tapping screws",
    "anchor bolts",
    "screw bazar",
    "OnlyScrews",
  ],
  openGraph: {
    title: "Screw Bazar - Premium Fasteners & Hardware Store",
    description:
      "Shop high-quality screws, bolts, nuts, and fasteners online. Trusted supplier for industrial and DIY projects across India.",
    url: "https://www.screwbazar.com",
    siteName: "Screw Bazar",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Screw Bazar - Premium Fasteners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Screw Bazar - Premium Fasteners & Hardware",
    description:
      "India's leading online fastener store. Shop screws, bolts, nuts & more.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.screwbazar.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <div>
      {/* Landing Page Hero Section */}
      <LandingPage />

      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* Categories Section */}
        <CategoriesSection />

        {/* Nylon Range Section */}
        <NylonRangeSection />

        {/* Featured Products Section */}
        <FeaturedProductsSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Spacing div */}
        <div className="h-15"></div>

        {/* CTA Section */}
        <div className="w-full bg-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: '"Nunito Sans", sans-serif' }}
            >
              Contact us today to discuss your fastener requirements and get a
              customized quote for your needs.
            </p>
            <CTAButton />
          </div>
        </div>
      </main>

      <Footer />
      <ContactButtons />
    </div>
  );
}
