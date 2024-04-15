import connectmongodb from "@/database/mongodb/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import CreatePost from "@/database/mongodb/models/addpost";

export async function POST(req: Request) {
  try {
    const { imageUrl, title, slug, authorImage, author, content } =
      await req.json();
    await connectmongodb();
    CreatePost.create({
      imageUrl,
      title,
      slug,
      authorImage,
      author,
      content,
    });
    return NextResponse.json({ "data added": "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ "error": error }, { status: 501 });
  }
}
