const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/url_shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


db.once('open', () => {
  console.log('Mongodb is connected!')
})

db.on('error', () => {
  console.log('Mongodb error')
})

