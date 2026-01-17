"use client";

import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  // Add safety check to prevent undefined product error
  if (!product) {
    return (
      <div className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
        <div className="h-48 md:h-56 bg-gray-200"></div>
        <div className="p-4 md:p-5">
          <div className="w-3/4 h-5 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded mb-4"></div>
          <div className="w-full h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const { 
    id = 0, 
    title = 'Product Name', 
    catId = 0, 
    foodImg = '/placeholder.jpg', 
    price = 0, 
    category = 'Unknown' 
  } = product;
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price / 100);

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-shop-dark-green/20">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          category === 'Vegetarian' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {category}
        </span>
      </div>
      
      {/* Wishlist/Heart Button */}
      <button 
        className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        aria-label="Add to wishlist"
      >
        <svg 
          className="w-5 h-5 text-gray-400 hover:text-red-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      </button>
      
      {/* Image Container with Hover Effects */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
        <img
          src={foodImg}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick View Overlay - This is the hover effect */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          {/* FIX: Added href prop to Link */}
          <Link href={`/shop/${id}`}>
            <button className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-shop-dark-green px-6 py-3 rounded-lg font-semibold hover:bg-shop-dark-green hover:text-white transition-colors duration-200 shadow-lg">
              Quick View
            </button>
          </Link>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 md:p-5">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Category ID: {catId}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-shop-dark-green transition-colors">
          <Link href={`/product/${id}`}>
            {title}
          </Link>
        </h3>
        
        {/* Description Placeholder */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          A delicious {title.toLowerCase()} recipe that will satisfy your taste buds.
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-shop-dark-green">
              {formattedPrice}
            </span>
            <span className="text-xs text-gray-500 ml-1">per serving</span>
          </div>
          
          <button className="bg-shop-dark-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-shop-dark-green/90 active:scale-95 transition-all duration-200 flex items-center gap-2">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            Add to Cart
          </button>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">4.0</span>
            <span className="ml-2 text-sm text-gray-500">(128 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;