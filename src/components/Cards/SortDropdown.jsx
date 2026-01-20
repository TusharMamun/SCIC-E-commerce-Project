"use client";

const SortDropdown = () => {
  return (
    <div className="relative">
      <select className="appearance-none bg-white pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-gray-50 transition-colors">
        <option value="newest">🔥 Newest First</option>
        <option value="price-low">💰 Price: Low to High</option>
        <option value="price-high">💰 Price: High to Low</option>
        <option value="rating">⭐ Top Rated</option>
        <option value="featured">🏆 Featured</option>
        <option value="discount">🎯 Best Deals</option>
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;