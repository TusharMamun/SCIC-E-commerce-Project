const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          <div className="p-5">
            <div className="h-5 bg-gray-200 rounded mb-3 animate-pulse" style={{ animationDelay: `${index * 0.1}s` }}></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4 animate-pulse" style={{ animationDelay: `${index * 0.15}s` }}></div>
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
              <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse" style={{ animationDelay: `${index * 0.25}s` }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;