import connectmongodb from "@/database/mongodb/mongo";
import { NextResponse } from "next/server";
import CreatePost from "@/database/mongodb/models/addpost";

export async function GET( req : Request , {params} : {params : {email : String}}) {
  try {
    const email =  params.email;
    await connectmongodb();
    const data = await CreatePost.find({"email" : email}).exec();
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ "error": error }, { status: 501 });
  }
}
