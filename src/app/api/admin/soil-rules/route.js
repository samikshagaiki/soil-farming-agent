import connectDB from "@/lib/db";
import SoilRule from "@/models/SoilRule";

export async function GET() {
  await connectDB();
  const rules = await SoilRule.find();
  return Response.json(rules);
}

export async function POST(req) {
  await connectDB();

  const data = await req.json();

  await SoilRule.create({
    region: data.region.toLowerCase(),
    phMin: data.phMin,
    phMax: data.phMax,
    moistureMin: data.moistureMin,
    nitrogenMin: data.nitrogenMin || 0,
    phosphorusMin: data.phosphorusMin || 0,
    potassiumMin: data.potassiumMin || 0,
    crops: data.crops
  });

  return Response.json({ message: "Soil rule saved to database" });
}
