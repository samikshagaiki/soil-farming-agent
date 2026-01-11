import connectDB from "@/lib/db";
import Distributor from "@/models/Distributor";

export async function GET() {
  await connectDB();
  const distributors = await Distributor.find();
  return Response.json(distributors);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  await Distributor.create({
    name: data.name,
    city: data.city.toLowerCase(),
    contact: data.contact,
    products: data.products
  });

  return Response.json({ message: "Distributor added successfully" });
}
