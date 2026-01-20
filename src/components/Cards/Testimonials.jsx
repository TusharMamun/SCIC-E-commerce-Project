// components/Sections/Testimonials.jsx
'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Tech Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      rating: 5,
      content: 'The quality of products and customer service is outstanding. My order arrived earlier than expected!',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      role: 'Professional Gamer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      rating: 5,
      content: 'Best place to buy gaming accessories. The prices are competitive and the products are authentic.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      rating: 4,
      content: 'Great selection of laptop accessories. The shipping was fast and packaging was secure.',
      date: '3 days ago'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      rating: 5,
      content: 'Perfect for all my streaming needs. The audio and video equipment selection is amazing!',
      date: '5 days ago'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-sm mb-4">
            <Quote className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">CUSTOMER REVIEWS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from some of our satisfied customers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="mb-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentTestimonial].rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-6">
                "{testimonials[currentTestimonial].content}"
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                width={40}
               height={40}
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={prevTestimonial}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex gap-1">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial ? 'bg-blue-600 w-4' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-sm text-gray-600">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">2K+</div>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-sm text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;