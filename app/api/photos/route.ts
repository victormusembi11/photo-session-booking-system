import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { albumId, photoUrl } = await req.json();

    const photo = await prisma.photo.create({
      data: {
        albumId,
        photoUrl,
      },
    });

    return NextResponse.json({ photo }, { status: 201 });
  } catch (error) {
    console.error("Error creating photo: ", error);
    return NextResponse.json({ message: "Error creating photo" }, { status: 500 });
  }
}
