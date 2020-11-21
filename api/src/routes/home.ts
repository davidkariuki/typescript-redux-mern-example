import express from "express"
export const homeRouter = express.Router()

homeRouter.get("/", (_req, res, _next) => {
  res.send({ data: `✌(◕‿-)✌` })
})
