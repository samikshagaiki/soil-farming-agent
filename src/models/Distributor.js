import mongoose from "mongoose";

const DistributorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      lowercase: true
    },
    contact: {
      type: String,
      required: true
    },
    products: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Distributor ||
  mongoose.model("Distributor", DistributorSchema);
