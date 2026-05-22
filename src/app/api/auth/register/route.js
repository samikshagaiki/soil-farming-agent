import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";

import User from "@/models/User";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();

    const existingUser = await User.findOne({
      email: body.email
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists"
        },
        {
          status: 400
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(body.password, 10);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: "user"
    });

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}