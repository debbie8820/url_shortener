const express = require('express')
const router = express.Router()
const Urls = require('../../models/Urls')
const generateId = require('../../config/generateId')
const checkOriginalUrl = require('../../middleware/checkOriginalUrl')


//接收使用者傳的url並轉成短網址
router.post('/create', checkOriginalUrl(), async (req, res) => {

  try {
    let id = ''
    await generateId().then(response => {
      id = response
    })

    await Urls.create({
      originalUrl: req.body.url,
      shortenedUrlId: id
    })

    const createdUrl = await Urls.findOne({ shortenedUrlId: id }).lean()
    const shortUrl = `${req.protocol}://${req.header('host')}/${createdUrl.shortenedUrlId}`
    res.render('created', { shortUrl })

  } catch (error) {
    console.log(error)
  }
})

module.exports = router