import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, ShoppingCart, Heart } from "lucide-react";
import {
  getProductsByCategory,
  formatPrice,
  type LocalProduct,
} from "../data/localProducts";
import OLXStyleHeader from "../components/OLXStyleHeader";
import StaticFooter from "../components/StaticFooter";
import BottomNavigation from "../components/BottomNavigation";
import { Button } from "@/components/ui/button";

export default function FashionCategory() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Map URL slug to category name
  const categoryMap: Record<string, "Men" | "Women" | "Kids"> = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    "marco-fashion": "Men", // Default to Men for marco-fashion
  };

  const categoryName = categoryMap[category?.toLowerCase() || ""] || "Men";
  const products = getProductsByCategory(categoryName);

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const categoryIcon = {
    Men: "👨",
    Women: "👩",
    Kids: "👶",
  }[categoryName];

  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <OLXStyleHeader />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <span className="text-5xl">{categoryIcon}</span>
                {categoryName}'s Fashion
              </h1>
            </div>
            <p className="text-white/90 text-lg">
              Discover the latest {categoryName.toLowerCase()} fashion collection
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found in this category
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Products ({products.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProduct(product._id)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gray-100 h-64">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product._id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition"
                      >
                        <Heart
                          size={20}
                          className={
                            favorites.has(product._id)
                              ? "fill-pink-500 text-pink-500"
                              : "text-gray-400"
                          }
                        />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                        {product.title}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {product.description}
                      </p>

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold text-gray-900">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="mb-4">
                        <p className="text-xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      {/* Sizes */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-600 mb-2">Sizes:</p>
                          <div className="flex flex-wrap gap-2">
                            {product.sizes.slice(0, 3).map((size) => (
                              <span
                                key={size}
                                className="px-2 py-1 text-xs border border-gray-300 rounded text-gray-700"
                              >
                                {size}
                              </span>
                            ))}
                            {product.sizes.length > 3 && (
                              <span className="px-2 py-1 text-xs border border-gray-300 rounded text-gray-700">
                                +{product.sizes.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Add to Cart Button */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Add to cart functionality
                          alert(`Added ${product.title} to cart`);
                        }}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <StaticFooter />
      <BottomNavigation />
    </div>
  );
}
