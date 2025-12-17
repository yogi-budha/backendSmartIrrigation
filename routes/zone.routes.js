import express from "express"
import { isAuth } from "../middleware/auth.js"
import { createZone, getZone } from "../controller/zone.controller.js"
const router = express.Router()

router.post("/:farm_id", isAuth,createZone)
router.get("/",isAuth, getZone)

export default router