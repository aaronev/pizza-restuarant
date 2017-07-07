const pgp = require('pg-promise')()
const dbName = 'pizza_restuarant'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const queries = pgp(connectionString)

const allInfo = table => queries.any(`SELECT * FROM ${table};`)
const delInfo = (table, column, value) => queries.none(`DELETE FROM ${table} WHERE ${column} = $1;`, value)
const usernamePassword = (username, password) => queries.any(
  'SELECT * FROM admin WHERE username = $1 and password = $2;', [username, password])
const addTo = (table, config, values) => queries.any(`INSERT INTO ${table} ${config} VALUES (${values});`)

const get = {
  allCustomers: allInfo('customers'),
  allPizzas: allInfo('pizzas'),
  allDrinks: allInfo('drinks'),
  allPreferences: allInfo('preferences'),
  adminByUsername: username => queries.any('SELECT * FROM admin WHERE username = $1;', username),
  adminByUsernamePassword: (username, password) => usernamePassword(username, password)
}

const add = {
  customer: values => addTo('customers', '(name, username, password, address, phone, payment)', values),
  pizza: values => addTo('pizzas', '(size, types, ingredients, price, happy_hour)', values),
  drink: values => addTo('drinks', '(description, manufacturer, supplier, price)', values)
}

module.exports = { get, add, delInfo }