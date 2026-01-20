'use client';

import { Check, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductInfomation() {
  const params = useParams();
  const { id } = params;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id || id.length !== 24) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/addproduct/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // Calculate price
  const originalPrice = product.price || 0;
  const discount = product.discount || 0;
  const discountAmount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link> / 
        <Link href="/shop" className="hover:text-blue-600 ml-1"> Shop</Link> / 
        <span className="ml-1 text-gray-900 font-medium">{product.title}</span>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <Image
              width={40}
              height={40}
                src={product.image || '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-auto rounded"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, index) => (
                  <Image
                  width={40}
                  height={40}
                    key={index}
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Title and Category */}
            <div className="mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {product.category || 'Product'}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.title || 'Product Name'}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5" fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating || '4.0'} ({product.reviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${finalPrice.toFixed(2)}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <button
                disabled={!product.inStock}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Quick Info */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-gray-500">Over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">2-Year Warranty</p>
                    <p className="text-xs text-gray-500">Full coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="font-medium">{value || 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}