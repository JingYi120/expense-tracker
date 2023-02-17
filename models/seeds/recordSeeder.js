const db = require('../../config/mongoose')
const Record = require('../record')
const recordS = require('./record.json')

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
      const userId = user._id
      return Promise.all(Array.from(
        { length: recordS.length },
        (_, i) => Record.create(records, { userId }) 
      ))


    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})