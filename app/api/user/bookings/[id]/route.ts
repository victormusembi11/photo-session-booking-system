import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: parseInt(id),
      },
      include: {
        user: true,
      },
    });

    if (bookings.length === 0) {
      return NextResponse.json({ message: "No bookings found for this user" }, { status: 404 });
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}
