// app/api/products/latest/route.js

import { dbConnect } from "@/lib/dbconnection";


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 6;
    
    const productCollection = dbConnect("Allproduct");
    
    // Get latest products sorted by creation date
    const products = await productCollection
      .find({})
      .sort({ createdAt: -1, _id: -1 }) // Sort by newest first
      .limit(limit)
      .toArray();

    return Response.json({
      success: true,
      data: products,
      count: products.length
    });

  } catch (error) {
  
    return Response.json({
      success: false,
      error: "Failed to fetch latest products"
    }, { status: 500 });
  }
}