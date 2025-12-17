import express from "express"
import { createUser, getUser, login } from "../controller/user.controller.js"
import { isAuth } from "../middleware/auth.js"
const router = express.Router()

router.post("/register", createUser)
router.post("/login", login)
router.get("/userDetail", isAuth,getUser)

export default router