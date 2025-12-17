import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  zoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Zone", required: true },
  type: { type: String, enum: ["moisture", "temperature", "humidity"], required: true },
  status: { type: String, enum: ["active", "inactive", "faulty"], default: "active" },
  lastReading: { type: Number },
},{timestamps: true});

const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;
