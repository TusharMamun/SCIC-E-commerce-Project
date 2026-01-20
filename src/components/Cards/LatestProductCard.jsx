// components/Cards/LatestProductCard.jsx
"use client";

import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LatestProductCard = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  if (!product) return null;

  const {
    _id,
    title = "Product Name",
    image,
    price = 0,
    discount = 0,
    rating = 4.0,
    inStock = true,
  } = product;

  const originalPrice = price;
  const finalPrice = originalPrice - (originalPrice * discount) / 100;
  const isProductNew = index < 2;

  // ✅ SAFE IMAGE HANDLING (IMPORTANT)
  const safeImage =
    typeof image === "string" &&
    (image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("/"))
      ? image
      : "/placeholder.png";

  console.log("FINAL IMAGE USED:", safeImage);

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      
      {/* NEW BADGE */}
      {isProductNew && (
        <div className="absolute top-2 left-2 z-20">
          <span className="px-2 py-1 bg-green-600 text-white text-[10px] font-bold rounded-full">
            NEW
          </span>
        </div>
      )}

      {/* DISCOUNT BADGE */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 z-20">
          <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full">
            -{discount}%
          </span>
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-32 w-full bg-gray-100">
        <Link href={`/shop/${_id}`}>
          <Image
            src={safeImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={index < 2}
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>

        <div className="flex items-center gap-1 mt-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600">{rating}</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div>
            {discount > 0 && (
              <p className="text-xs line-through text-gray-400">
                ৳{originalPrice}
              </p>
            )}
            <p className="text-sm font-bold text-green-600">
              ৳{finalPrice.toFixed(0)}
            </p>
          </div>

          <button
            disabled={!inStock}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestProductCard;
