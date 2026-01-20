// components/Sections/CategoryGrid.jsx
'use client';

import Link from 'next/link';
import { 
  Headphones, 
  Keyboard, 
  Battery, 
  Gamepad2, 
  Laptop, 
  Video, 
  Watch, 
  Cable 
} from 'lucide-react';

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: 'Audio',
      icon: <Headphones className="w-8 h-8" />,
      items: 128,
      color: 'bg-purple-100 text-purple-600',
      link: '/category/audio'
    },
    {
      id: 2,
      name: 'Peripherals',
      icon: <Keyboard className="w-8 h-8" />,
      items: 89,
      color: 'bg-blue-100 text-blue-600',
      link: '/category/peripherals'
    },
    {
      id: 3,
      name: 'Power & Charging',
      icon: <Battery className="w-8 h-8" />,
      items: 56,
      color: 'bg-green-100 text-green-600',
      link: '/category/power-charging'
    },
    {
      id: 4,
      name: 'Gaming',
      icon: <Gamepad2 className="w-8 h-8" />,
      items: 74,
      color: 'bg-red-100 text-red-600',
      link: '/category/gaming'
    },
    {
      id: 5,
      name: 'Laptop Accessories',
      icon: <Laptop className="w-8 h-8" />,
      items: 92,
      color: 'bg-indigo-100 text-indigo-600',
      link: '/category/laptop-accessories'
    },
    {
      id: 6,
      name: 'Video & Streaming',
      icon: <Video className="w-8 h-8" />,
      items: 45,
      color: 'bg-pink-100 text-pink-600',
      link: '/category/video-streaming'
    },
    {
      id: 7,
      name: 'Watch Accessories',
      icon: <Watch className="w-8 h-8" />,
      items: 38,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/category/watch-accessories'
    },
    {
      id: 8,
      name: 'Cables & Adapters',
      icon: <Cable className="w-8 h-8" />,
      items: 67,
      color: 'bg-gray-100 text-gray-600',
      link: '/category/cables-adapters'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Shop By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide range of electronic categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
     
              <div     key={category.id} className="bg-white rounded-xl p-4 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.items} items
                </p>
              </div>
      
          ))}
        </div>

        {/* View All Button */}
   
      </div>
    </section>
  );
};

export default CategoryGrid;