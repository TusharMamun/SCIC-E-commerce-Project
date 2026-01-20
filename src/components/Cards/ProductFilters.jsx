"use client";

import { useRouter } from 'next/navigation';

const ProductFilters = ({ categories, brands, totalProducts, currentFilters }) => {
  const router = useRouter();

  const applyFilter = (key, value) => {
    const params = new URLSearchParams(currentFilters);
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      {/* Categories */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => applyFilter('category', '')}
            className={`w-full text-left px-2 py-1 rounded text-sm ${!currentFilters.category ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => applyFilter('category', category)}
              className={`w-full text-left px-2 py-1 rounded text-sm ${currentFilters.category === category ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Brands</h4>
        <div className="space-y-1">
          <button
            onClick={() => applyFilter('brand', '')}
            className={`w-full text-left px-2 py-1 rounded text-sm ${!currentFilters.brand ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
          >
            All Brands
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => applyFilter('brand', brand)}
              className={`w-full text-left px-2 py-1 rounded text-sm ${currentFilters.brand === brand ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={currentFilters.inStock === 'true'}
            onChange={(e) => applyFilter('inStock', e.target.checked ? 'true' : '')}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className="text-sm text-gray-600">In Stock Only</span>
        </label>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Total: <span className="font-semibold">{totalProducts} products</span>
        </p>
      </div>
    </div>
  );
};

export default ProductFilters;