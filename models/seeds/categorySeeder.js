const db = require('../../config/mongoose')
const Category = require('../category')
const categories = require('./category.json')

db.once('open', () => {
  Category.create(categories)
    .then(() => {
      console.log('Add category seed')
      return db.close()
    })
    .catch((err) => console.error(err))
})