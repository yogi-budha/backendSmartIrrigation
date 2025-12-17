import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["low_moisture", "tank_empty", "sensor_failure"], required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["read", "unread"], default: "unread" }
},{timestamps: true});

export default Notification = mongoose.model("Notification", notificationSchema);
