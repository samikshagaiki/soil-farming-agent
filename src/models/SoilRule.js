import mongoose from "mongoose";

const SoilRuleSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
      lowercase: true
    },
    phMin: {
      type: Number,
      required: true
    },
    phMax: {
      type: Number,
      required: true
    },
    moistureMin: {
      type: Number,
      required: true
    },
    nitrogenMin: {
      type: Number,
      default: 0
    },
    phosphorusMin: {
      type: Number,
      default: 0
    },
    potassiumMin: {
      type: Number,
      default: 0
    },
    crops: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.SoilRule ||
  mongoose.model("SoilRule", SoilRuleSchema);
