const express = require('express')
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const router = express.Router()
const { authenticator } = require('../middleware/auth')



router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/', authenticator, home)



// 匯出路由器
module.exports = router