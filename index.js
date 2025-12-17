import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import UserRouter from "./routes/user.routes.js"
import connectDB from "./config/DbConnect.js";
import cookieParser from "cookie-parser";
import FarmRouter from "./routes/farm.routes.js"
import ZoneRouter from "./routes/zone.routes.js"
import SensorRouter from "./routes/sensors.routes.js"

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", UserRouter)
app.use("/farm", FarmRouter)
app.use("/zone", ZoneRouter)
app.use("/sensor", SensorRouter)

app.get("/", (req, res) => {
    res.send("Hello World")
})


app.listen(4000, () => {
    connectDB()
    console.log("Server running on port 4000")
})

