const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {type: String, required: true},
  img: {type: String, required: true},
  year: {type: Number, required: true},
  genre: {type: Array, required: true},
  rating: {type: Number, required: true},
  description: {type: String, required: true},
  type: {type: Array, required: true},
})

module.exports = mongoose.model('movie', movieSchema);