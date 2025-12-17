import express from "express"
import { isAuth } from "../middleware/auth.js"
import { createFarm, getFarm } from "../controller/farm.controller.js"
const router = express.Router()

router.post("/", isAuth,createFarm)
router.get("/:farm_id",isAuth, getFarm)

export default router