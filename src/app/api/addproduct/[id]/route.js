import { dbConnect } from "@/lib/dbconnection";
import { product } from "../../route";
import { ObjectId } from "mongodb";

    const productCollection = dbConnect("Allproduct")
export async function GET(request,{params}){
    const {id} =await params;
    if(id.length!=24){
        return Response.json({
            status:400,
            message:"Send Currect id"
        })
    }
    const query ={_id: new ObjectId(id)}

const result =await productCollection.findOne(query)



    return Response.json(result)
}








// export async function DELETE(request,{params}){
//     const {id} =await params;
//     if(id.length!=24){
//         return Response.json({
//             status:400,
//             message:"Send Currect id"
//         })
//     }
//     const query ={_id: new ObjectId(id)}

// const result =await productCollection.deleteOne(query)



//     return Response.json(result)
// }
// export async function PATCH(request,{params}){
//     const {id} =await params;
//     const
//     if(id.length!=24){
//         return Response.json({
//             status:400,
//             message:"Send Currect id"
//         })
//     }
//     const query ={_id: new ObjectId(id)}

// const result =await productCollection.deleteOne(query)



//     return Response.json(result)
// }