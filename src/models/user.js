import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },
    gender: { type: String, enum: ['woman', 'man'] },
    birthday: { type: Date },
    avatar: String,
  },
  {
    timestamps: true,
  },
)

schema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('users', schema)
