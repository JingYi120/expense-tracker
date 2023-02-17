const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection

// db發生錯誤時，發出提醒
db.on('error', () => {
  console.log('mongodb error!')
})

// db成功時，會跑出提示，once：這件事只會做一次
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db