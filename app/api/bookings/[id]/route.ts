import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        Album: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking: ", error);
    return NextResponse.json({ message: "Error fetching booking" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { bookingDate, status, description } = await req.json();

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        bookingDate: bookingDate ? new Date(bookingDate) : undefined,
        status,
        description,
      },
    });

    return NextResponse.json({ booking: updatedBooking }, { status: 200 });
  } catch (error) {
    console.error("Error updating booking: ", error);
    return NextResponse.json({ message: "Error updating booking" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.booking.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting booking: ", error);
    return NextResponse.json({ message: "Error deleting booking" }, { status: 500 });
  }
}
