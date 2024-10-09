import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, role } = body;

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        role,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user ", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users ", error);
    return NextResponse.json({ error: "Failed to retrieve users" }, { status: 400 });
  }
}
