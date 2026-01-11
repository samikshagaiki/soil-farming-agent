import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "MongoDB connected successfully" });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "MongoDB connection failed" }),
      { status: 500 }
    );
  }
}
