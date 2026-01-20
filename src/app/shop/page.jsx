import ProductCard from "@/components/Cards/ProductCard";
import Container from "@/components/Container";

const getProducts = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/addproduct`
    
    const res = await fetch(url, {
      cache: 'no-store',
    });
    
    const data = await res.json();

    if (data.success) {
      return {
        products: data.data || [],
        success: true
      };
    } else {
      throw new Error('API returned unsuccessful response');
    }
    
  } catch (error) {
  
    return { 
      products: [], 
      success: false 
    };
  }
}

export default async function ShopPage() {
  const { products, success } = await getProducts();

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          All Products
        </h1>
        <p className="text-gray-600">
          Browse our complete collection of products
        </p>
      </div>

      {/* Products Count */}
      {products.length > 0 && (
        <div className="mb-6 text-sm text-gray-500">
          Showing {products.length} products
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>

      {/* No Products Message */}
      {success && products.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Check back later for new arrivals.
          </p>
        </div>
      )}

      {/* Error State */}
      {!success && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Failed to load products
          </h3>
          <p className="text-gray-500">
            Please try refreshing the page.
          </p>
        </div>
      )}
    </Container>
  );
}