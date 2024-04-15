import connectmongodb from "@/database/mongodb/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import CreatePost from "@/database/mongodb/models/addpost";

export async function POST(req: Request) {
  try {
    const { id ,  imageUrl, title, slug, content } =
      await req.json();
    await connectmongodb();
    await CreatePost.updateOne( { _id : id } , {
      $set:{
        imageUrl : imageUrl,
        title : title,
        slug : slug,
        content : content,
      }
    });
    return NextResponse.json({ "data updated": "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ "error": error }, { status: 501 });
  }
}
