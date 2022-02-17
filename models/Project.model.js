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
    //still have to check whether this is still required in another position, for the new dropdown we need just a string
    toolsNeeded:[{          // choose out of the Tools DB that was initiated in seed.js
        type: Schema.Types.ObjectId,
        ref: 'Tool'
    }],
    //toolsNeeded:[String],
    created: {
        type: Date,
        default: Date.now
    },
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }]
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;