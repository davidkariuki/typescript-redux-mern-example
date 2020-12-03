import express from "express"
import Stream from "../model/Stream"

export const streamsRouter = express.Router()

streamsRouter
  .route("/")
  .get(async (_req, res) => {
    Stream.find({}, (error, streams) => {
      if (error) return res.status(error.status).send(error)

      return res.send(streams)
    })
  })
  .post(async (req, res) => {
    const { userId, title, description } = req.body
    const stream = new Stream({ userId, title, description })

    stream.save((error) => {
      if (error) return res.status(error.status).send(error)

      return res.status(201).send(stream)
    })
  })

streamsRouter
  .route("/:id")
  .get(async (req, res) => {
    Stream.findOne({ _id: req.params.id }, (error, stream) => {
      if (error) return res.status(error.status).send(error)

      return res.send(stream)
    })
  })
  .patch(async (req, res) => {
    const { title, description } = req.body

    Stream.findOneAndUpdate(
      { _id: req.params.id },
      { title, description },
      { new: true },
      (error, stream) => {
        if (error) return res.status(error.status).send(error)

        return res.send(stream)
      }
    )
  })
  .delete(async (req, res) => {
    const id = req.params.id

    Stream.deleteOne({ _id: id }, (error) => {
      if (error) return res.status(error.status).send(error)

      return res.send(id)
    })
  })
