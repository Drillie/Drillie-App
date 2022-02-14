const { Schema, model } = require("mongoose");

const toolSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    }
  }
);

const Tool = model("Tool", toolSchema);

module.exports = Tool;
