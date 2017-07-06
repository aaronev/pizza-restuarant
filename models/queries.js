const pgp = require('pg-promise')()
const dbName = 'pizza_restuarant'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const queries = pgp(connectionString)

const allInfo = table => queries.any(`SELECT * FROM ${table};`)

const get = {
  allCustomers: allInfo('customers'),
  adminByUsernamePassword: (username, password)=> queries.any('SELECT * FROM admin WHERE username = $1 and password = $2;', [username, password]),
  adminByUsername: username => queries.any('SELECT * FROM admin WHERE username = $1;', username)
}

module.exports = { get }