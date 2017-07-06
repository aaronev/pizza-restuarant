const pgp = require('pg-promise')()
const dbName = 'pizza_restuarant'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const queries = pgp(connectionString)

const allInfo = table => queries.any(`SELECT * FROM ${table};`)
const delInfo = (table, column, id) => queries.none(`DELETE FROM ${table} WHERE ${column} = $1;`, id)

const get = {
  allCustomers: allInfo('customers'),
  adminByUsernamePassword: (username, password)=> queries.any('SELECT * FROM admin WHERE username = $1 and password = $2;', [username, password]),
  adminByUsername: username => queries.any('SELECT * FROM admin WHERE username = $1;', username),
  allPizzas: allInfo('pizzas'),
  allDrinks: allInfo('drinks'),
  allPreferences: allInfo('preferences')
}

module.exports = { get, delInfo }