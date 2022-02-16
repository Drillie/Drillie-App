const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    initiator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        // minlength: 150,
        // maxlength: 3000
    },
    toolsNeeded:[{          // choose out of the Tools DB that was initiated in seed.js
        type: Schema.Types.ObjectId,
        ref: 'Tool'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;