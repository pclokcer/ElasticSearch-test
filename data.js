const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  names: String
})


module.exports = mongoose.model('test', schema)
