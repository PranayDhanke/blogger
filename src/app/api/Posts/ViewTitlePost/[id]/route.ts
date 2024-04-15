import connectmongodb from "@/database/mongodb/mongo";
import { NextResponse } from "next/server";
import CreatePost from "@/database/mongodb/models/addpost";

export async function GET(
  req: Request,
  { params }: { params: { id: any } }
) {
  try {
    const id = params.id;
    await connectmongodb();
    
    const data = await CreatePost.findById(id).exec();
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ "error": error }, { status: 501 });
  }
}
