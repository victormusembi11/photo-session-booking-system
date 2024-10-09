import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(`Error fetching users: ${error}`, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashedPassword,
      },
    });

    return new NextResponse(JSON.stringify({ message: "User created", user }), { status: 201 });
  } catch (error) {
    return new NextResponse(`Error creating user: ${error}`, {
      status: 500,
    });
  }
};
