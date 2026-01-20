// components/Sections/FeaturedProducts.jsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/Cards/ProductCard';
import { Star, TrendingUp, Clock, Filter } from 'lucide-react';
import Link from 'next/link';
import LatestProductCard from './LatestProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'featured', label: 'Featured' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'discount', label: 'On Sale' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [activeFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/addproduct/latest?limit=8&filter=${activeFilter}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
 
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-bold rounded-full">
                FEATURED PRODUCTS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Popular Products
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our handpicked selection of premium products loved by thousands
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className="md:hidden">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                {filters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">1,248</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8/5</p>
              </div>
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Today</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Sale</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <Filter className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="transform transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <LatestProductCard product={product} />
                </div>
              ))}
            </div>
            
            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                View All Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;