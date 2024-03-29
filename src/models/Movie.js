const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {type: String, required: true},
  img: {type: String, required: true},
  date: {
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true},
  },
  genre: {type: Array, required: true},
  rating: {type: Number, required: true},
  description: {type: String, required: true},
  type: {type: Array, required: true},
  duration: {type: String, required: true},
  creator: {type: String, required: true},
  casting: {type: String, required: true},
  videos: {
    trailer: {type: String, required: true},
    players: {type: Array, required: true},
  },
  require_join: {type: Boolean, required: true},
})

module.exports = mongoose.model('movie', movieSchema);