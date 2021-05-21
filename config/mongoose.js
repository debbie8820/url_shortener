const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url_shortener'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


db.once('open', () => {
  console.log('Mongodb is connected!')
})

db.on('error', () => {
  console.log('Mongodb error')
})

