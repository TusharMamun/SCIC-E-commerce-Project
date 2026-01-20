// components/Products/LatestProducts.jsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/Cards/ProductCard';
import { RefreshCw, AlertTriangle, Package } from 'lucide-react';
import Link from 'next/link';
import LatestProductCard from '../Cards/LatestProductCard';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLatestProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/addproduct/latest?limit=6`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data)
      
      if (data.success) {
        setProducts(data.data || []);
      } else {
        throw new Error(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching latest products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Unable to Load Products
          </h2>
          <p className="text-gray-600 mb-6">
            {error}. Please check if the API endpoint is running.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={fetchLatestProducts}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <Link
              href="/shop"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            No Products Available
          </h2>
          <p className="text-gray-600 mb-6">
            Check back soon for new arrivals!
          </p>
          <button
            onClick={fetchLatestProducts}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Check Again
          </button>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Latest Products</h2>
          <p className="text-gray-600 mt-2">
            Discover our newest arrivals and exclusive items
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">
            Showing {products.length} of latest products
          </span>
          <button
            onClick={fetchLatestProducts}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            title="Refresh latest products"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <div key={product._id} className="transform transition-all duration-300 hover:-translate-y-1">
            {/* Pass the entire product object to ProductCard */}
            <LatestProductCard  product={product} />
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
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
    </div>
  );
};

export default LatestProducts;