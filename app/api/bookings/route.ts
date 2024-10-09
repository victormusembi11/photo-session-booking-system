import { NextResponse } from "next/server";
import { BookingStatus } from "@prisma/client";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, bookingDate, status, description } = await req.json();

  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId: parseInt(userId),
        bookingDate: new Date(bookingDate),
        status: status || BookingStatus.PENDING,
        description,
      },
    });

    return NextResponse.json({ booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking: ", error);
    return NextResponse.json({ message: "Error creating booking" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}
