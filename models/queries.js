const pgp = require('pg-promise')()
const dbName = 'pizza_restuarant'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)


const allInfo = table => db.any(`SELECT * FROM ${table};`)


const get = {
  allCustomers: allInfo('customers')
}


module.exports = { get }