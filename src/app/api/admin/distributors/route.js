import connectDB from "@/lib/db";

import Distributor from "@/models/Distributor";

import { NextResponse } from "next/server";

export async function GET() {

  try {

    await connectDB();

    const distributors =
      await Distributor.find();

    return NextResponse.json(
      distributors
    );

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

export async function POST(req) {

  try {

    await connectDB();

    const body = await req.json();

    const distributor =
      await Distributor.create({
        name: body.name,
        city: body.location.toLowerCase(),
        contact: body.contact,
        products: body.products
      });

    return NextResponse.json({
      success: true,
      distributor
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