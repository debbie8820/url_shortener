const express = require('express')
const router = express.Router()
const Urls = require('../../models/Urls')
const isEmpty = require('../../config/isEmpty')

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Urls.findOne({ shortenedUrlId: id })
    .lean()
    .then((url) => {
      if (isEmpty(url)) { //輸入錯誤短網址會會回傳的訊息
        return res.send('This website is invalid, please check again')
      }
      res.redirect(url.originalUrl)
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router