import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!photo) {
      return NextResponse.json({ message: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json({ photo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching photo: ", error);
    return NextResponse.json({ message: "Error fetching photo" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { photoUrl } = await req.json();

  try {
    const updatedPhoto = await prisma.photo.update({
      where: { id: parseInt(id) },
      data: {
        photoUrl,
      },
    });

    return NextResponse.json({ photo: updatedPhoto }, { status: 200 });
  } catch (error) {
    console.error("Error updating photo: ", error);
    return NextResponse.json({ message: "Error updating photo" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.photo.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Photo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting photo: ", error);
    return NextResponse.json({ message: "Error deleting photo" }, { status: 500 });
  }
}