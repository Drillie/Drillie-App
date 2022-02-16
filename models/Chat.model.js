const { Schema, model } = require("mongoose");

const msgSchema = new Schema(
  {
    msg: {
      type: String,
      required: true
    }
  }
);

const Msg = model("Msg", msgSchema);

module.exports = Msg;
