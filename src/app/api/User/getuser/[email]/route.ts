import connectmongodb from "@/database/mongodb/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import addmongouser from "@/database/mongodb/models/adduser";

export async function GET(
  req: Request,
  { params }: { params: { email: String } }
) {
  try {
    const Email = params.email;
    await connectmongodb();
    const data = await addmongouser.findOne({ email: Email });

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 501 });
  }
}
