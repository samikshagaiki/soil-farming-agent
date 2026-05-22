// import genAI from "@/lib/gemini";

// export async function getCropRecommendation(soil) {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash", // ✅ updated model name
//   });

//   const prompt = `
// Suggest the best crops for the following soil data.

// pH: ${soil.ph}
// Moisture: ${soil.moisture}
// Nitrogen: ${soil.nitrogen}
// Phosphorus: ${soil.phosphorus}
// Potassium: ${soil.potassium}
// Location: ${soil.location}

// Return ONLY valid JSON (no markdown, no backticks) in this format:

// {
//   "crops": [],
//   "fertilizer": "",
//   "soilHealth": ""
// }
// `;

//   const result = await model.generateContent(prompt);
//   const response = result.response.text();

//   // Strip markdown code fences if present
//   const cleaned = response.replace(/```json|```/g, "").trim();

//   return JSON.parse(cleaned);
// }


export async function getCropRecommendation(
  soil
) {

  let crops = [];

  let fertilizer = "";

  let soilHealth = "";

  // Soil health logic
  if (
    soil.ph >= 6 &&
    soil.ph <= 7.5
  ) {
    soilHealth = "Healthy";
  } else {
    soilHealth =
      "Moderately unhealthy";
  }

  // Crop recommendation logic

  if (
    soil.ph >= 6 &&
    soil.ph <= 7 &&
    soil.moisture >= 40
  ) {
    crops.push(
      "Wheat",
      "Rice",
      "Sugarcane"
    );
  }

  if (
    soil.nitrogen >= 50 &&
    soil.phosphorus >= 40
  ) {
    crops.push(
      "Maize",
      "Cotton"
    );
  }

  if (
    soil.potassium >= 40
  ) {
    crops.push(
      "Soybean",
      "Groundnut"
    );
  }

  if (crops.length === 0) {
    crops.push(
      "No suitable crop found"
    );
  }

  // Fertilizer advice

  if (soil.nitrogen < 40) {
    fertilizer =
      "Nitrogen-rich fertilizer recommended";
  } else if (
    soil.phosphorus < 30
  ) {
    fertilizer =
      "Phosphorus fertilizer recommended";
  } else {
    fertilizer =
      "Balanced fertilizer suitable";
  }

  return {
    crops,
    fertilizer,
    soilHealth
  };
}