
import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  value: { type: Number, required: true },
},{timestamps: true});

 const SensorData = mongoose.model("SensorData", sensorDataSchema);
  export default SensorData;
