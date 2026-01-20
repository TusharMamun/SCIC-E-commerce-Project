'use client';

import { CheckCircle, Edit, Eye, Filter, Plus, RefreshCw, Search, Trash2, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const UpdateProductData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    inStock: 0,
    outOfStock: 0,
    featured: 0
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/addproduct`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        updateStats(data.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const updateStats = (productsList) => {
    const total = productsList.length;
    const inStock = productsList.filter(p => p.inStock).length;
    const outOfStock = productsList.filter(p => !p.inStock).length;
    const featured = productsList.filter(p => p.featured).length;
    
    setStats({ total, inStock, outOfStock, featured });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Delete product
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/shop/${productId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove from local state
        setProducts(products.filter(p => p._id !== productId));
        setShowDeleteModal(false);
        setProductToDelete(null);
      } else {
        alert('Failed to delete product: ' + data.error);
      }
    } catch (error) {

      alert('Error deleting product');
    }
  };

  // Toggle stock status
  const toggleStockStatus = async (productId, currentStatus) => {
    try {
      const response = await fetch(`/api/shop/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !currentStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setProducts(products.map(p => 
          p._id === productId ? { ...p, inStock: !currentStatus } : p
        ));
      }
    } catch (error) {

    }
  };

  // Toggle featured status
  const toggleFeatured = async (productId, currentStatus) => {
    try {
      const response = await fetch(`/api/shop/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setProducts(products.map(p => 
          p._id === productId ? { ...p, featured: !currentStatus } : p
        ));
      }
    } catch (error) {
 
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Products</h1>
        <p className="text-gray-600">View, edit, and manage your product inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Stock</p>
              <p className="text-3xl font-bold text-green-600">{stats.inStock}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-3xl font-bold text-purple-600">{stats.featured}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, brand, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={fetchProducts}
              className="p-2 border rounded-lg hover:bg-gray-50"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            
            <a
              href="/admin/addproduct"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </a>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filters'
                : 'No products available. Add your first product!'}
            </p>
            <a
              href="/admin/addproduct"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add First Product
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                          width={90}
                          height={50}
                            src={product.image}
                            alt={product.title}
                            className="h-10 w-10 rounded object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </div>
                      {product.discount > 0 && (
                        <div className="text-xs text-red-600">
                          {product.discount}% OFF
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStockStatus(product._id, product.inStock)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.inStock
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFeatured(product._id, product.featured)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.featured
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {product.featured ? 'Featured' : 'Regular'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/shop/${product._id}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        
                        <a
                          href={`/shop/${product._id}`}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </a>
                        
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Delete Product
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "{productToDelete.title}"? 
              This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              
              <button
                onClick={() => handleDelete(productToDelete._id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination/Info */}
      {filteredProducts.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div>
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled
            >
              Previous
            </button>
            <span>Page 1 of 1</span>
            <button
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProductData;