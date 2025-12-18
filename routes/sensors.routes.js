import express from "express"
import { isAuth } from "../middleware/auth.js"
import { createSensor, getSensor, updateSensor } from "../controller/sensors.controllers.js"
const router = express.Router()

router.post("/:zone_id", isAuth,createSensor)
router.post("/",isAuth, updateSensor)
router.get("/:zone_id",isAuth, getSensor)

export default router