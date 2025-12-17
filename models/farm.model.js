import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farm_name: { type: String, required: true },
  location: { type: String },
  area: { type: Number }, // in square meters
},{timestamps: true});

const Farm = mongoose.model("Farm", farmSchema);
export default Farm