import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { albumId: string } }) {
  try {
    const { albumId } = params;

    const photos = await prisma.photo.findMany({
      where: { albumId: parseInt(albumId) },
      orderBy: { createdAt: "desc" },
    });

    if (!photos || photos.length === 0) {
      return NextResponse.json({ message: "No photos found for this album" }, { status: 404 });
    }

    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching photos: ", error);
    return NextResponse.json({ message: "Error fetching photos" }, { status: 500 });
  }
}
