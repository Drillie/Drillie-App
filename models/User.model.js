const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password:{
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      default: ''
    },
    toolsAvailable: [{          // choose out of the Tools DB that was initiated in seed.js
      type: Schema.Types.ObjectId,
      ref: 'Tool'
    }]
  }
);

const User = model("User", userSchema);

module.exports = User;
