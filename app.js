const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')

const PORT = process.env.PORT || 3000
const app = express()

const routes = require('./routes')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is connected on localhost:${PORT}`)
})