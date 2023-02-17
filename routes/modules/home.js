const express = require('express')
const router = express.Router()
const moment = require('moment')
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  Category.find({ })
    .lean()
    .sort({ _id: 'asc' })
    .then(categories =>{
      Record.find({ })
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
        const totalAmount = 0
        records.forEach(record => {
          totalAmount += record.amount
          record.date = moment(record.date).format('YYYY/MM/DD')
          categories.find(category => {
            if (category.name === record.category) {
              return record.icon = category.icon
            }
          })
          return res.render('index', {
            catagories,
            records,
            totalAmount})
            })
          })
    })
    .catch(error => console.error(error))
})

module.exports = router