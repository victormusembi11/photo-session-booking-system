// api/users/login.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";  // Assuming you're using JWT for authentication

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("Invalid email or password", { status: 400 });
    }

    // Check if the password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new NextResponse("Invalid email or password", { status: 400 });
    }

    // Create JWT token (if you're using JWT)
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
        user: { id: user.id, email: user.email, role: user.role },
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(`Error during login: ${error}`, { status: 500 });
  }
};
