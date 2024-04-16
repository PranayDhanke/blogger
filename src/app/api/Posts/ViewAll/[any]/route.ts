import connectmongodb from "@/database/mongodb/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import CreatePost from "@/database/mongodb/models/addpost";

export async function GET() {
  try {
    await connectmongodb();
    // Execute the query and await its result
    const data = await CreatePost.find({}).exec();
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ "Error" : error }, { status: 501 });
  }
}
