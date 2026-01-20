const ShopStats = ({ currentPage, totalPages, totalProducts, productsCount }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="text-sm font-medium text-blue-700 mb-1">CURRENT PAGE</div>
          <div className="text-3xl font-bold text-gray-900">
            {currentPage}<span className="text-blue-600">/{totalPages}</span>
          </div>
        </div>
        
        <div className="hidden md:block h-12 w-px bg-blue-200"></div>
        
        <div className="text-center">
          <div className="text-sm font-medium text-purple-700 mb-1">PRODUCTS SHOWN</div>
          <div className="text-3xl font-bold text-gray-900">
            {productsCount}<span className="text-purple-600">/{totalProducts}</span>
          </div>
        </div>
        
        <div className="hidden md:block h-12 w-px bg-blue-200"></div>
        
        <div className="text-center md:text-right">
          <div className="text-sm font-medium text-green-700 mb-1">TOTAL COLLECTION</div>
          <div className="text-3xl font-bold text-gray-900">
            {totalProducts} <span className="text-lg text-gray-500">items</span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Page progress</span>
          <span>{Math.round((currentPage / totalPages) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ShopStats;