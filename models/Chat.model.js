const { Schema, model } = require("mongoose");

const msgSchema = new Schema(
  {
    msg: {
      type: String,
      required: true
    },
    project: {
      type: Schema.Types.ObjectId,
        ref: 'Project'
    }
  }
);

const Msg = model("Msg", msgSchema);

module.exports = Msg;
