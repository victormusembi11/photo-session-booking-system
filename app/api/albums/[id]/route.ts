import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const album = await prisma.album.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        booking: true,
        Photo: true,
      },
    });

    if (!album) {
      return NextResponse.json({ message: "Album not found" }, { status: 404 });
    }

    return NextResponse.json({ album }, { status: 200 });
  } catch (error) {
    console.error("Error fetching album: ", error);
    return NextResponse.json({ message: "Error fetching album" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { albumName, visibleToUser } = await req.json();

    const updatedAlbum = await prisma.album.update({
      where: { id: parseInt(id) },
      data: {
        albumName,
        visibleToUser,
      },
    });

    return NextResponse.json({ album: updatedAlbum }, { status: 200 });
  } catch (error) {
    console.error("Error updating album: ", error);
    return NextResponse.json({ message: "Error updating album" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.album.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Album deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting album: ", error);
    return NextResponse.json({ message: "Error deleting album" }, { status: 500 });
  }
}
