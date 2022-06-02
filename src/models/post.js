import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    photo: String,
  },
  {
    timestamps: true,
  },
)

schema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('posts', schema)
