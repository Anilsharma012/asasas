import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import { DEMO_FASHION_PRODUCTS, formatFashionPrice } from "../data/fashionProducts";

const SLIDE_INTERVAL = 5000;

export default function FashionProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const products = DEMO_FASHION_PRODUCTS;

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, SLIDE_INTERVAL);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [products.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index % products.length);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, SLIDE_INTERVAL);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
      <div className="px-4 max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Featured Collections
          </h2>
          <p className="text-gray-300">
            Discover the latest from Marco Fashion
          </p>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative rounded-lg overflow-hidden bg-white shadow-2xl"
        >
          {/* Slides */}
          <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
            {products.map((product, index) => (
              <div
                key={product._id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Image Section */}
                  <div className="bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleFavorite(product._id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.has(product._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col justify-center bg-white">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating!)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                    )}

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Available Colors
                        </p>
                        <div className="flex gap-2">
                          {product.colors.map((color) => (
                            <div
                              key={color}
                              className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                            >
                              {color}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and Button */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900">
                        {formatFashionPrice(product.price)}
                      </div>
                      <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-colors shadow-lg"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-colors shadow-lg"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-gray-900 w-8"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick View of Categories */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {["Men", "Women", "Kids"].map((category) => {
            const count = DEMO_FASHION_PRODUCTS.filter(
              (p) => p.category === category as any
            ).length;
            return (
              <div
                key={category}
                className="bg-white rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {category}
                </h3>
                <p className="text-gray-600 mb-4">{count} items</p>
                <button className="text-gray-900 font-semibold hover:text-gray-600 transition-colors">
                  Browse →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
