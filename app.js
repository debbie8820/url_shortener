const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')

const Urls = require('./models/Urls')
const { urlencoded } = require('express')

const PORT = 3000

const app = express()


app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})


//Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    let randomElement = array[randomIndex]
    array[randomIndex] = array[i]
    array[i] = randomElement
  }
  return array
}

const characterString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let characterArray = characterString.split('')


function generateId() {
  let shuffledArray = shuffle(characterArray)
  let selectedId = ''
  while (selectedId.length < 6) {
    let randomIndex = Math.floor(Math.random() * (shuffledArray.length))
    selectedId += shuffledArray[randomIndex]
  }
  const verifyId = checkId(selectedId)
  if (!verifyId) {
    return generateId()
  }
  return selectedId
}


//檢查短網址id是否重複
async function checkId(id) {
  const isRepeated = await Urls.exists({ shortenedUrlId: id })
  return isRepeated
}

//檢查物件是否為空
function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false
  }
  return true
}

//middleware檢查使用者輸入的網址是否已存在
const checkOriginalUrl = () => (req, res, next) => {
  Urls.findOne({ originalUrl: req.body.url })
    .then((url) => {
      if (isEmpty(url)) {
        next()
      } else {
        const shortUrl = `${req.protocol}://${req.header('host')}/URLs/${url.shortenedUrlId}`
        res.render('created', { shortUrl })
      }
    })
}

//接收使用者傳的url並轉成短網址
app.post('/URLs/create', checkOriginalUrl(), (req, res) => {
  const id = generateId()
  return Urls.create({
    originalUrl: req.body.url,
    shortenedUrlId: id
  }).then((url) => {
    const shortUrl = `${req.protocol}://${req.header('host')}/URLs/${id}`
    res.render('created', { shortUrl })
  }).catch(error => {
    console.log(error)
  })
})

app.get('/URLs/:id', (req, res) => {
  const id = req.params.id
  return Urls.findOne({ shortenedUrlId: id })
    .lean()
    .then((url) => {
      if (isEmpty(url)) {     //輸入錯誤短網址會會回傳的訊息
        res.send('This website is invalid, please check again')
      }
      res.redirect(url.originalUrl)
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(PORT, () => {
  console.log(`App is connected on localhost ${PORT}`)
})