const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '/images/profile_default.jpeg',
  },
  phone: Number,
  location: String,
  toolsAvailable: [
    {
      // choose out of the Tools DB that was initiated in seed.js
      type: Schema.Types.ObjectId,
      ref: 'Tool',
    },
  ],
  tools: [String],
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  reviews: String,
  offer: String,
})

const User = model('User', userSchema)

module.exports = User
