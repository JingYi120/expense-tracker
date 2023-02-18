const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const records = require('./record.json')
const User = require('../user')

const SEED_USER = {
  name: 'root',
  email: 'root@root',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      return Promise.all(Array.from(records, seedRecord => {
        return Category.findOne({ name: seedRecord.category })
          .lean()
          .then(category => {
            return Record.create({
              name: seedRecord.name,
              date: seedRecord.date,
              amount: seedRecord.amount,
              userId: user._id,
              categoryId: category._id
            })
          })
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})