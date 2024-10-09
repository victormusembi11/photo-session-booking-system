import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, bookingId, albumName, visibleToUser } = await req.json();

    const album = await prisma.album.create({
      data: {
        userId,
        bookingId,
        albumName,
        visibleToUser,
      },
    });

    return NextResponse.json({ album }, { status: 201 });
  } catch (error) {
    console.error("Error creating album: ", error);
    return NextResponse.json({ message: "Error creating album" }, { status: 500 });
  }
}
