import mongoose from "mongoose"

const streamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
})

streamSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
  },
})

export default mongoose.model("Stream", streamSchema)
