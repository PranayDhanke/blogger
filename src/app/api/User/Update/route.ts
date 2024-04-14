import connectmongodb from "@/database/mongodb/mongo";
import { NextResponse } from "next/server";
import addmongouser from "@/database/mongodb/models/adduser";

export async function POST(req: Request) {
  try {
    const {id , username , image} = await req.json();
    await connectmongodb();

    await addmongouser.updateOne( { _id : id } , {
        $set:{
          username : username , 
          image : image,
        }
      });
    
    return NextResponse.json({ "data added": "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 501 });
  }
}
