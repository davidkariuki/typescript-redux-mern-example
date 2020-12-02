import express from "express"
import Stream from "../model/Stream"

export const streamsRouter = express.Router()

streamsRouter
  .route("/")
  .get(async (_req, res) => {
    try {
      const streams = await Stream.find({})
      res.send(streams)
    } catch (error) {
      res.status(400).send(error)
    }
  })
  .post(async (req, res) => {
    const { userId, title, description } = req.body
    const stream = new Stream({ userId, title, description })

    try {
      const savedStream = await stream.save()
      res.send(savedStream)
    } catch (error) {
      res.status(400).send(error)
    }
  })

streamsRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const stream = await Stream.findById(req.params.id)

      res.send(stream)
    } catch (error) {
      res.status(400).send(error)
    }
  })
  .put(async (req, res) => {
    try {
      const stream = await Stream.updateOne(
        { _id: req.params.id },
        { title: req.body.title, description: req.body.description }
      )

      res.send(stream)
    } catch (error) {
      res.status(400).send(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id

      await Stream.deleteOne({ _id: id })

      res.send(id)
    } catch (error) {
      res.status(400).send(error)
    }
  })
