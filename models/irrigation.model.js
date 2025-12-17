
import mongoose from "mongoose";

const irrigationLogSchema = new mongoose.Schema({
  zoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Zone", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  waterUsed: { type: Number }, // in liters
},{timestamps: true});

export default IrrigationLog = mongoose.model("IrrigationLog", irrigationLogSchema);
