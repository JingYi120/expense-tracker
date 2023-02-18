const express = require('express')
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')



router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)



// 匯出路由器
module.exports = router