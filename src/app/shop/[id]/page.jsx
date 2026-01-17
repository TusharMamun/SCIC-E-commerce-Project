// app/product/[id]/page.jsx
import Container from '@/components/Container'
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Clock, 
  Users, 
  ChefHat, 
  ArrowLeft,
  Share2,
  Minus,
  Plus,
  Shield,
  Truck
} from 'lucide-react'
import Link from 'next/link'

const getSingleFood = async (id) => {
  try {
    // Try different API endpoints
    const endpoints = [
      `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`,
      `https://taxi-kitchen-api.vercel.app/api/v1/foods/random`
    ]
    
    for (const endpoint of endpoints) {
      const res = await fetch(endpoint, { cache: 'no-store' })
      
      if (res.ok) {
        const data = await res.json()
        
        // If API returns array, find by ID
        if (data.foods && Array.isArray(data.foods)) {
          const found = data.foods.find(food => food.id === parseInt(id))
          if (found) return found
        }
        
        // If direct match
        if (data.details || data.food || (data.id && data.id.toString() === id)) {
          return data.details || data.food || data
        }
      }
    }
    
    return null
  } catch (error) {
    console.error("Error fetching food:", error)
    return null
  }
}

const DetailsPage = async ({ params }) => {
  const { id } = await params
  
  const food = await getSingleFood(id)

  if (!food) {
    return (
      <Container>
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-red-600 mb-4">😔 Product Not Found</h1>
            <p className="text-gray-600 mb-8">
              Sorry, we could 't find the product with ID <span className="font-semibold">{id}</span>.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-shop-dark-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-shop-dark-green/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Shop
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  // Mock data for extra details
  const details = {
    description: `Indulge in our exquisite ${food.title.toLowerCase()}, crafted with premium ingredients and traditional techniques. Each serving is carefully prepared to deliver authentic flavors that will transport your taste buds to culinary heaven.`,
    ingredients: [
      "Premium quality ingredients",
      "Fresh vegetables & herbs",
      "Authentic spices blend",
      "Organic produce",
      "No artificial preservatives"
    ],
    nutrition: {
      calories: "450-550",
      protein: "25g",
      carbs: "45g",
      fat: "18g"
    },
    preparation: "15-20 minutes",
    servings: "2-3 people",
    spiceLevel: "Medium",
    chefTip: "Best served hot with fresh bread or rice"
  }

  const formattedPrice = (food.price / 100).toFixed(2)

  return (
    <Container>
      {/* Breadcrumb */}
      <div className="py-6 border-b">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-shop-dark-green">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-shop-dark-green">Shop</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{food.title}</span>
        </div>
      </div>

      <div className="min-h-screen py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
              <img
                src={food.foodImg}
                alt={food.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              
              {/* Labels */}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                  food.category === 'Vegetarian' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : food.category === 'Vegan'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {food.category}
                </span>
              </div>
              
              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group">
                <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
              </button>
              
              {/* Quick Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{details.preparation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{details.servings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5" />
                    <span>{details.spiceLevel}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thumbnail Gallery (Mock) */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3].map((thumb) => (
                <div 
                  key={thumb}
                  className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-shop-dark-green transition-all"
                >
                  <img
                    src={food.foodImg}
                    alt={`${food.title} ${thumb}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">{food.title}</h1>
              <p className="text-gray-600 text-lg">Product ID: <span className="font-mono">{id}</span></p>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-medium">4.8/5</span>
                <span className="text-gray-500">(247 reviews)</span>
              </div>
            </div>
            
            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-shop-dark-green">${formattedPrice}</span>
                    <span className="text-gray-500">per serving</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Including all taxes • Free delivery</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600 line-through">${(food.price / 100 * 1.2).toFixed(2)}</div>
                  <span className="text-green-600 font-semibold">Save 20%</span>
                </div>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button className="p-3 hover:bg-gray-50">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 text-xl font-semibold">1</span>
                  <button className="p-3 hover:bg-gray-50">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-600">Available: 12 servings</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-3 bg-shop-dark-green text-white py-4 rounded-xl font-semibold hover:bg-shop-dark-green/90 transition-colors text-lg shadow-lg hover:shadow-xl">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart - ${formattedPrice}
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 border-2 border-shop-dark-green text-shop-dark-green py-4 rounded-xl font-semibold hover:bg-shop-dark-green/5 transition-colors text-lg">
                <Share2 className="w-6 h-6" />
                Share
              </button>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm text-gray-600">In 30-45 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold">Quality Guarantee</p>
                  <p className="text-sm text-gray-600">100% satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-shop-dark-green font-semibold text-shop-dark-green">
                Description
              </button>
              <button className="pb-4 text-gray-600 hover:text-shop-dark-green">
                Ingredients
              </button>
              <button className="pb-4 text-gray-600 hover:text-shop-dark-green">
                Nutrition
              </button>
              <button className="pb-4 text-gray-600 hover:text-shop-dark-green">
                Reviews (247)
              </button>
            </div>
          </div>
          
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">About this dish</h3>
                <p className="text-gray-700 leading-relaxed">
                  {details.description}
                </p>
                
                <div className="mt-6 space-y-4">
                  <h4 className="text-xl font-semibold">Key Features</h4>
                  <ul className="space-y-3">
                    {details.ingredients.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-shop-dark-green rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-xl font-semibold mb-6">Nutritional Information</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-semibold">{details.nutrition.calories}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Protein</span>
                    <span className="font-semibold">{details.nutrition.protein}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Carbohydrates</span>
                    <span className="font-semibold">{details.nutrition.carbs}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fat</span>
                    <span className="font-semibold">{details.nutrition.fat}</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="font-semibold">Chef's Tip</p>
                      <p className="text-sm text-gray-600">{details.chefTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8">You might also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
                <h4 className="font-semibold mb-2">Similar Dish {item}</h4>
                <p className="text-shop-dark-green font-bold">$12.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default DetailsPage