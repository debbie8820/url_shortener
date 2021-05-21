const Urls = require('../models/Urls')
const isEmpty = require('../config/isEmpty')

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

module.exports = checkOriginalUrl