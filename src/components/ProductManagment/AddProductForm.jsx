// app/components/ProductForm.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const AddProductForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageLinks, setImageLinks] = useState(''); // Simple text field for all images

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brand: '',
    price: '',
    description: '',
  });

  const categories = ['Audio', 'Peripherals', 'Adapters & Cables', 'Power & Charging'];
  const brands = ['SoundMax', 'RazorEdge', 'ConnectPro', 'Apple', 'Samsung'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Product title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!imageLinks.trim()) newErrors.images = 'Image URLs are required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill all required fields',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    setLoading(true);

    try {
      // Split by comma and clean up
      const images = imageLinks.split(',')
        .map(link => link.trim())
        .filter(link => link !== '');

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        image: images[0], // First image as main
        images: images, // All images in array
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/addproduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Product added!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Reset form
          setFormData({
            title: '',
            category: '',
            brand: '',
            price: '',
            description: '',
          });
          setImageLinks('');
          setErrors({});
        });
      } else {
        Swal.fire('Error', 'Failed to add product', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Wireless Earbuds"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand *
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="99.99"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
          </div>

          {/* Images - SIMPLE VERSION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URLs (comma separated) *
            </label>
            <textarea
              value={imageLinks}
              onChange={(e) => setImageLinks(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter image URLs separated by commas. First image will be main.
            </p>
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Product description..."
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;