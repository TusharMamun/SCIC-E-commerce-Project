import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
      {/* Badge Skeleton */}
      <div className="absolute top-3 left-3 z-10">
        <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
      </div>
      
      {/* Wishlist Button Skeleton */}
      <div className="absolute top-3 right-3 z-10">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
      </div>
      
      {/* Image Container Skeleton */}
      <div className="h-48 md:h-56 bg-gray-200"></div>
      
      {/* Product Info */}
      <div className="p-4 md:p-5">
        {/* Category Badge Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-12 h-4 bg-gray-200 rounded"></div>
        </div>
        
        {/* Title */}
        <div className="mb-3">
          <div className="w-3/4 h-5 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/2 h-5 bg-gray-200 rounded"></div>
        </div>
        
        {/* Description */}
        <div className="mb-4 space-y-2">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="w-16 h-7 bg-gray-200 rounded mb-1"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>
          
          <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
            <div className="ml-2 w-8 h-4 bg-gray-200 rounded"></div>
            <div className="ml-2 w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;