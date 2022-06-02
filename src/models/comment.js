import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    body: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  },
)

schema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('comments', schema)
