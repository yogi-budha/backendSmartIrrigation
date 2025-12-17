import express from "express"
import { isAuth } from "../middleware/auth.js"
import { createSensor } from "../controller/sensors.controllers.js"
const router = express.Router()

router.post("/:zone_id", isAuth,createSensor)
// router.get("/:sensor_id",isAuth, getFarm)

export default router