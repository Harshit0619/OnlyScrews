import Footer from "../components/Footer";
import ContactButtons from "../components/FloatingButton";
import LandingPage from "../components/LandingPage";
import NylonRangeSection from "../components/NylonRangeSection";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedProductsSection from "../components/FeaturedProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import CTAButton from "../components/ui/CTAButton";

export default function Home() {
  return (
    <div className="-mt-[144px]">
      {/* Landing Page Hero Section */}
      <LandingPage />

      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* Nylon Range Section */}
        <NylonRangeSection />

        {/* Categories Section */}
        <CategoriesSection />

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
