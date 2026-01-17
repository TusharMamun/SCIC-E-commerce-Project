import React from 'react'
import Container from '@/components/Container'

const ProductDetailsSkeleton = () => {
  return (
    <Container>
      {/* Breadcrumb Skeleton */}
      <div className="py-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="min-h-screen py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery Skeleton */}
          <div>
            {/* Main Image Skeleton */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
              {/* Badge Skeleton */}
              <div className="absolute top-4 left-4">
                <div className="w-20 h-8 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* Wishlist Button Skeleton */}
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* Quick Info Overlay Skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thumbnail Gallery Skeleton */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3].map((thumb) => (
                <div 
                  key={thumb}
                  className="w-20 h-20 rounded-lg bg-gray-200 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Product Details Skeleton */}
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div>
              <div className="w-3/4 h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              
              {/* Rating Skeleton */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-200 rounded mr-1"></div>
                  ))}
                </div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Price Skeleton */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-xl border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="flex items-baseline gap-2">
                    <div className="w-32 h-12 bg-gray-300 rounded"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-48 h-3 bg-gray-300 rounded mt-4"></div>
                </div>
                <div className="text-right">
                  <div className="w-24 h-8 bg-gray-300 rounded mb-1"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Quantity Selector Skeleton */}
            <div className="space-y-4">
              <div className="w-24 h-6 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <div className="w-12 h-12 bg-gray-200"></div>
                  <div className="w-16 h-12 bg-gray-200"></div>
                  <div className="w-12 h-12 bg-gray-200"></div>
                </div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Action Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="flex-1 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            
            {/* Benefits Skeleton */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="w-24 h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="w-32 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="w-28 h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="w-24 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information Tabs Skeleton */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex gap-8">
              {['Description', 'Ingredients', 'Nutrition', 'Reviews'].map((tab) => (
                <div key={tab} className="pb-4">
                  <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="w-48 h-8 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="w-36 h-7 bg-gray-200 rounded"></div>
                  <ul className="space-y-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-48 h-4 bg-gray-200 rounded"></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-xl">
                <div className="w-48 h-8 bg-gray-300 rounded mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  {['Calories', 'Protein', 'Carbohydrates', 'Fat'].map((item) => (
                    <div key={item} className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                      <div className="w-16 h-4 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="w-24 h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="w-48 h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Skeleton */}
        <div className="mt-16">
          <div className="w-64 h-10 bg-gray-200 rounded mb-8 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border rounded-xl p-4">
                <div className="h-40 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="w-32 h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductDetailsSkeleton