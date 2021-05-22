const express = require('express')
const router = express.Router()
const Urls = require('../../models/Urls')
const generateId = require('../../config/generateId')
const checkOriginalUrl = require('../../middleware/checkOriginalUrl')


//接收使用者傳的url並轉成短網址
router.post('/create', checkOriginalUrl(), (req, res) => {
  const id = generateId()
  return Urls.create({
    originalUrl: req.body.url,
    shortenedUrlId: id
  }).then((url) => {
    const shortUrl = `${req.protocol}://${req.header('host')}/${id}`
    res.render('created', { shortUrl })
  }).catch(error => {
    console.log(error)
  })
})

module.exports = router