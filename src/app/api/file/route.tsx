import { NextResponse, NextRequest } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file.name) {
    return NextResponse.json({ error: "No File Provided" }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
  });

  return Response.json(blob);
}

import { list } from "@vercel/blob";

export const config = {
  runtime: "edge",
};

export async function GET(request: Request) {
  const { blobs } = await list();
  return NextResponse.json(blobs);
}
