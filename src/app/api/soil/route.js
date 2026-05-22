import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import { soilSchema } from "@/validators/soilValidator";

import { getCropRecommendation } from "../../../services/aiRecommendation";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const parsedData = soilSchema.parse({
      ph: Number(body.ph),
      moisture: Number(body.moisture),
      nitrogen: Number(body.nitrogen),
      phosphorus: Number(body.phosphorus),
      potassium: Number(body.potassium),
      location: body.location
    });

    const recommendation =
      await getCropRecommendation(parsedData);

    return NextResponse.json({
      success: true,
      soil: parsedData,
      recommendation
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}