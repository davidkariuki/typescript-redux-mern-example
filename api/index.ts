import express from "express"
import createError from "http-errors"

import { errorHandler } from "./errorHandler"
import { homeRouter } from "./routes/home"

const app = express()
const PORT = 8080

app.use("/", homeRouter)

app.listen(PORT, () => {
  console.log(`🌿 [API]: running at http://localhost:${PORT}`)
})

app.use((_req, _res, next) => {
  next(createError(404))
})

app.use(errorHandler)
