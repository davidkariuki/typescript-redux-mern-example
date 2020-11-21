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
    const stream = new Stream({
      title: req.body.title,
      description: req.body.description,
    })

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
      const stream = await Stream.deleteOne({ _id: req.params.id })

      res.send(stream)
    } catch (error) {
      res.status(400).send(error)
    }
  })
