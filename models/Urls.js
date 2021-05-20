const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originalUrl: String,
  shortenedUrlId: String
})

module.exports = mongoose.model('Url', urlSchema)