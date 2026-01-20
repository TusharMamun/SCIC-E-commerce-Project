// components/Sections/BrandsShowcase.jsx
'use client';

import { useState, useEffect } from 'react';
import { Check, Star, Award, TrendingUp } from 'lucide-react';

const BrandsShowcase = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch brands or use static data
    const brandData = [
      { id: 1, name: 'Apple', logo: '🍎', products: 245, rating: 4.8, featured: true },
      { id: 2, name: 'Samsung', logo: '📱', products: 189, rating: 4.7, featured: true },
      { id: 3, name: 'Sony', logo: '🎧', products: 156, rating: 4.6, featured: true },
      { id: 4, name: 'Bose', logo: '🔊', products: 98, rating: 4.9, featured: true },
      { id: 5, name: 'Logitech', logo: '🖱️', products: 134, rating: 4.5, featured: false },
      { id: 6, name: 'Razer', logo: '🐍', products: 89, rating: 4.7, featured: true },
      { id: 7, name: 'Anker', logo: '🔋', products: 167, rating: 4.6, featured: false },
      { id: 8, name: 'JBL', logo: '🎵', products: 112, rating: 4.4, featured: true },
    ];
    setBrands(brandData);
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
            <Award className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">TRUSTED BRANDS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Shop Top Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover products from world-renowned brands trusted by millions worldwide
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group relative bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              {brand.featured && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {brand.logo}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
              
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(brand.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-600 ml-1">{brand.rating}</span>
              </div>
              
              <p className="text-xs text-gray-500">{brand.products} products</p>
            </div>
          ))}
        </div>

        {/* Brand Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Authentic Products</h4>
              <p className="text-sm text-gray-600">100% genuine products with warranty</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Best Prices</h4>
              <p className="text-sm text-gray-600">Price match guarantee on all brands</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Official Partners</h4>
              <p className="text-sm text-gray-600">Authorized reseller for all brands</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-2xl">🔧</div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Full Support</h4>
              <p className="text-sm text-gray-600">Brand-authorized service centers</p>
            </div>
          </div>
        </div>

        {/* View All Brands */}
        <div className="text-center mt-10">
          <a
            href="/brands"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Explore All Brands
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;