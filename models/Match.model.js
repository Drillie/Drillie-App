const matchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

const Match = model('Match', matchSchema)

module.exports = Match
