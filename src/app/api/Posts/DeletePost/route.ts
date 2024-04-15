import connectmongodb from "@/database/mongodb/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import CreatePost from "@/database/mongodb/models/addpost";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    await connectmongodb();
    await CreatePost.deleteOne({ _id: id });
    return NextResponse.json({ "data Deleted": "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ "error": error }, { status: 501 });
  }
}
