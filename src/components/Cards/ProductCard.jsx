// components/Cards/ProductCard.jsx
"use client";

import { ShoppingCart, Star, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  if (!product) return null;

  const {
    _id,
    title = "Product Name",
    image,
    price = 0,
    discount = 0,
    rating = 4.0,
    reviews = 0,
    inStock = true,
  } = product;

  // ✅ IMAGE VALIDATION (MOST IMPORTANT FIX)
  const safeImage =
    typeof image === "string" &&
    (image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("/"))
      ? image
      : "/placeholder.png";

  console.log("FINAL IMAGE:", safeImage);

  const originalPrice = typeof price === "number" ? price : 0;
  const finalPrice = originalPrice - (originalPrice * discount) / 100;

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      
      {/* DISCOUNT BADGE */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-20">
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -{discount}%
          </span>
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <Link href={`/shop/${_id}`}>
          <Image
            src={safeImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* WISHLIST */}
        <button
          onClick={() => setIsInWishlist(!isInWishlist)}
          className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm z-20"
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>

        {/* OUT OF STOCK */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-3 py-1 bg-gray-800 text-white text-sm font-bold rounded">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <Link href={`/shop/${_id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600">
            {title}
          </h3>
        </Link>

        {/* RATING */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${finalPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            disabled={!inStock}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              inStock
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
