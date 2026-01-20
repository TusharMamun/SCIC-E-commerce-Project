"use server"

import { dbConnect } from "@/lib/dbconnection"
import bcrypt from "bcryptjs"; 
import { success } from "zod";

export const postUser = async (payload) => {
  try {
    // 1. Validate required fields
    if (!payload.email || !payload.password || !payload.name) {
      return {
        success: false,
        message: "Missing required fields"
      }
    }

    // 2. Connect to database and check if user exists
    const isExisted = await dbConnect("users").findOne({ email: payload.email })
    
    if (isExisted) {
      return {
        success: false,
        message: "User Already Existed"
      }
    }

    // 3. Hash the password with salt rounds
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(payload.password, saltRounds)

    // 4. Create new user object
    const newUser = {
      ...payload,
      createdAt: new Date().toISOString(), // Added parentheses
      role: "user",
      password: hashpassword
    }

    // 5. Insert the new user into the database
    const result = await dbConnect("users").insertOne(newUser)

    // 6. Return success response
if(result.acknowledged){
    return{
        success:true,
        message:`user created with ${result.insertedId.toString()}`
    }
}

  } catch (error) {

    return {
      success: false,
      message: "Internal server error"
    }
  }
}