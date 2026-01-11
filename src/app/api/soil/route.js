import connectDB from "@/lib/db";
import SoilRule from "@/models/SoilRule";

function matchRule(rule, soil) {
  return (
    soil.ph >= rule.phMin &&
    soil.ph <= rule.phMax &&
    soil.moisture >= rule.moistureMin &&
    soil.nitrogen >= rule.nitrogenMin &&
    soil.phosphorus >= rule.phosphorusMin &&
    soil.potassium >= rule.potassiumMin
  );
}

export async function POST(req) {
  try {
    await connectDB();
    const soil = await req.json();

    const rules = await SoilRule.find({
      region: soil.location.toLowerCase()
    });

    let crops = ["No suitable crop found"];

    for (const rule of rules) {
      if (matchRule(rule, soil)) {
        crops = rule.crops;
        break;
      }
    }

    return Response.json({
      ...soil,
      crops
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Soil analysis failed" }),
      { status: 500 }
    );
  }
}



