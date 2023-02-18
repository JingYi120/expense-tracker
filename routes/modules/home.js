const express = require('express')
const router = express.Router()
const moment = require('moment')
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id

  Category.find({})
    .lean()
    .then(catagories => {
      Record.find({ userId })
        .populate('categoryId')
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          let totalAmount = 0
          records.forEach(record => {
            totalAmount += record.amount
            record.date = moment(record.date).format('YYYY-MM-DD')
          })

          return res.render('index', {
            records,
            catagories,
            totalAmount
          })
        })
    })
    .catch(error => console.error(error))
})


router.get('/search', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categoryId

  if (!categoryId) {
    return res.redirect('/')
  }

  Category.find({})
    .lean()
    .then(catagories => {
      catagories.forEach(category => {
        if (String(category._id) === categoryId) {
          category.preset = true
        } else {
          category.preset = false
        }
      })
      Record.find({ userId, categoryId })
        .populate('categoryId')
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          let totalAmount = 0
          records.forEach(record => {
            totalAmount += record.amount
            record.date = moment(record.date).format('YYYY-MM-DD')
          })

          return res.render('index', {
            catagories,
            records,
            totalAmount
          })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router