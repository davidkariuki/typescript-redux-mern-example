import express from "express"
import createError from "http-errors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import colors from "colors"
import cors from "cors"

import { errorHandler } from "./errorHandler"
import { homeRouter } from "./routes/home"
import { streamsRouter } from "./routes/streams"

dotenv.config()
colors.enable()

mongoose.connect(
  process.env.DB_URI!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.info("[DB]: 🥞 database connected".blue)
  }
)

const db = mongoose.connection
db.on(
  "error",
  console.error.bind(console, "[DB]: MongoDB connection error:".magenta)
)

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use("/", homeRouter)
app.use("/streams", streamsRouter)

app.use((_req, _res, next) => {
  next(createError(404))
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.info(`[API]: 🌿 running at http://localhost:${PORT}`.yellow)
})
