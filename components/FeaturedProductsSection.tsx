"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  image: string;
  title: string;
}

const FeaturedProductsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop",
      title: "M2 & M2.5 3D Printing assorted screw pack",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop",
      title:
        "M3 & M4 3D Printing assorted screw pack (Allen socket heads, hex nuts, washers & M3 brass inserts)",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=400&fit=crop",
      title:
        "Hex(Allen) Socket Head Assorted Screw Pack M3, M4 Pack M3, M4 & M5 (SS304)",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
      title: "Phillips CSK Assorted Screw Pack M3, M4 & M5 (SS304)",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
      title: "Hex(Allen) Button Head Assorted Screw Pack M3, M4 & M5 (SS304)",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&h=400&fit=crop",
      title: "Hex(Allen) Socket(CSK) Assorted Screw Pack M3, M4 & M5 (SS304)",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1581093458791-9f3c3250a33a?w=400&h=400&fit=crop",
      title: "Screws Pan Head Assorted Screw Pack M3, M4 & M5 (SS304)",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=400&fit=crop",
      title: "Slotted cheese Head Assorted Screw Pack M3, M4 & M5 (SS304)",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      title: "M3 Allen Button Head SS304 Assorted Screw Pack",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop",
      title: "M4 Allen Button Head SS304 Assorted Screw Pack",
    },
  ];

  // Group products into slides (8 products per slide - 2 rows of 4)
  const productsPerSlide = 8;
  const slides = [];
  for (let i = 0; i < products.length; i += productsPerSlide) {
    slides.push(products.slice(i, i + productsPerSlide));
  }

  const scrollPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance slideshow effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, slides.length]);

  return (
    <section
      className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 flex items-center justify-between">
          <h2 className="flex-1 text-4xl md:text-5xl font-bold text-[#BCFF83] text-center">
            Our Featured Products
          </h2>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 border border-gray-700 rounded-md hover:border-[#BCFF83] hover:bg-[#BCFF83] hover:text-black transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 border border-gray-700 rounded-md hover:border-[#BCFF83] hover:bg-[#BCFF83] hover:text-black transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slideProducts, slideIndex) => (
              <div key={slideIndex} className="flex-shrink-0 w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {slideProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center"
                    >
                      {/* Card container for image only (dark background to match grid) */}
                      <div className="w-[280px] rounded-lg bg-black shadow-[0_6px_20px_rgba(0,0,0,0.6)] border border-neutral-800 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-[160px] object-contain block bg-transparent"
                        />
                      </div>

                      {/* Text separate below the card */}
                      <div className="mt-3 px-4 text-[15px] text-white font-medium max-w-[280px] text-center">
                        {product.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button className="px-8 py-3 border-2 border-[#BCFF83] bg-[#BCFF83] text-black rounded-lg font-semibold hover:bg-transparent hover:text-[#BCFF83] transition-all duration-300">
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
