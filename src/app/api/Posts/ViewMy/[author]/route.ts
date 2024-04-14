import connectmongodb from "@/database/mongodb/mongo";
import { NextResponse } from "next/server";
import CreatePost from "@/database/mongodb/models/addpost";

export async function GET( req : Request , {params} : {params : {author : String}}) {
  try {
    const username =  params.author;
    await connectmongodb();
    const data = await CreatePost.find({"author" : username}).exec();
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ "error": error }, { status: 501 });
  }
}
