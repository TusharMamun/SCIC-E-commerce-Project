import { dbConnect } from "@/lib/dbconnection";

   const productCollection =   dbConnect("Allproduct");
 export async function GET() {
  try {
    // Connect to database


    // Get all products
    const products = await productCollection.find({}).toArray();

    return Response.json({
      success: true,
      data: products
    });

  } catch (error) {

    return Response.json(
      { 
        success: false, 
        error: "Failed to fetch products"
      },
      { status: 500 }
    );
  }
}








// POST - Create new product
export async function POST(request) {
  try {
    // Get collection

    
    // Get product data from request
    const productData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'price', 'category', 'brand', 'image'];
    const missingFields = requiredFields.filter(field => !productData[field]);
    
    if (missingFields.length > 0) {
      return Response.json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Create the new product object
    const newProduct = {
      // Required fields
      title: productData.title.trim(),
      price: productData.price, // Already converted to cents in frontend
      category: productData.category,
      brand: productData.brand,
      image: productData.image, // Main image
      
      // Optional fields with defaults
      subcategory: productData.subcategory || '',
      description: productData.description || '',
      discount: productData.discount || 0,
      rating: productData.rating || 4.0,
      reviews: productData.reviews || 0,
      inStock: productData.inStock !== false, // Default to true
      isFeatured: productData.isFeatured || false,
      images: productData.images || [],
      features: productData.features || [],
      specs: productData.specs || {},
      
      // Timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Insert into database
    const result = await productCollection.insertOne(newProduct);
    
    // Return success response
    return Response.json({
      status: 201,
      success: true,
      message: "Product added successfully",
      insertedId: result.insertedId,
      data: {
        _id: result.insertedId,
        ...newProduct
      }
    });
    
  } catch (error) {

    return Response.json({
      status: 500,
      success: false,
      message: "Failed to add product to database",
      error: error.message
    });
  }
}