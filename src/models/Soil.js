import mongoose from "mongoose";

const SoilSchema = new mongoose.Schema(
    {
        ph:Number,
        moisture:Number,
        nitrogen:Number,
        phosphorus:Number,
        potassium:Number,
        location:String,
        recommendedCrops:[String]

    },
    {timestamps:true}
);

export default mongoose.models.Soil || mongoose.model("Soil",SoilSchema);