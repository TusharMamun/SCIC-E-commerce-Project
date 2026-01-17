import ProductCard from '@/components/Cards/ProductCard'
import Container from '@/components/Container'
import { Subtext } from '@/components/ui/Text'

const getProducts = async () => {
  try {
    const res = await fetch("https://taxi-kitchen-api.vercel.app/api/v1/foods/random", {
      // Optional: Configure caching
      // cache: 'no-store',
      // next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      console.error('Failed to fetch products')
      return []
    }
    
    const data = await res.json()
    
    // REMOVE or reduce timeout - 1000ms max for testing
    // await new Promise((resolve) => setTimeout(resolve, 1000)) // 1 second
    
    return data.foods || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

const ShopPage = async () => {
  const foods = await getProducts()

  return (
    <Container>
      {/* Page Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Menu</h1>
        <Subtext className="text-lg text-gray-600">
          Discover a world of delicious meals, freshly picked for you.
        </Subtext>
        
        {/* Stats Bar */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg inline-block">
          <h2 className="text-xl font-semibold text-green-800">
            Total Products Found: <span className='text-red-600'>{foods.length}</span>
          </h2>
          <p className="text-sm text-green-700 mt-1">
            Showing a random selection from our full collection of 304 dishes.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      {foods.length > 0 ? (
        <>
          {/* Category Filter Bar */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-shop-dark-green text-white rounded-full font-medium">
              All Dishes
            </button>
          </div>

          {/* Main Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {foods.map((food) => (
              <ProductCard key={food.id} product={food} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-500 mb-4">
            No dishes available at the moment.
          </h3>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      )}
    </Container>
  )
}

export default ShopPage