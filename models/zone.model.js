import mongoose from "mongoose";


const zoneSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  zone_name: { type: String, required: true },
  cropType: { type: String },
  soilType: { type: String },
  area: { type: Number },
  lastIrrigationTime: { type: Date },
  valveStatus: { type: String, enum: ["ON", "OFF"], default: "OFF" },
  sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sensor" }]
},{timestamps: true});

const Zone = mongoose.model("Zone", zoneSchema);

export default Zone
