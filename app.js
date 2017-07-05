
const express = require('express')
const db = require('./models/queries')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var session = null

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.route('/')
  .get((req, res, next) => {
    if (!session) {
      res.render('login')
    }
    db.get.allCustomers
    .then((customers) => {
      res.render('index', {customers: customers})
    }).catch(next)
  })

app.route('/login')
  .post((req, res, next) => {
    req.body
  })

app.listen(port, console.log(`Listening to port ${port}`))