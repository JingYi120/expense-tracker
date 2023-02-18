const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then(catagories => {
      return res.render('new', { catagories })
    })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  Record.create({
    name,
    date,
    categoryId,
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Category.find({})
    .lean()
    .then(catagories => {
      return Record.findOne({ _id, userId })
        .lean()
        .then(record => {
          catagories.forEach(category => {
            if (String(category._id) === String(record.categoryId)) {
              category.preset = true
            } else {
              category.preset = false
            }
          })
          record.date = moment(record.date).format('YYYY-MM-DD')
          res.render('edit', { record, catagories })
        })
        .catch(error => console.log(error))
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, categoryId, date, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      return record.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})



router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router