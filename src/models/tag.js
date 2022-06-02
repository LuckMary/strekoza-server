import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: false,
  },
)

schema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('tags', schema)
