const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const urls = require('./modules/urls')
const id = require('./modules/id')

router.use('/', home)
router.use('/', id)
router.use('/urls', urls)

module.exports = router