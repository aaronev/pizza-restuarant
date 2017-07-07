const express = require('express')
const db = require('./models/queries')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const app = express()
const port = 3000

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret: 'secret'}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((users, done) => {
  done(null, users.username)
})
passport.deserializeUser((username, done) => {
  db.get.adminByUsername(username)
  .then( users => done(null, users) )
})
passport.use( new LocalStrategy( (username, password, done) => {
  db.get.adminByUsernamePassword(username, password)
  .then( users => {
    if (users) {
      return done(null, users[0]) 
    } else { 
      return done(null, false) 
    }
  })
}))

app.route('/')
.get((req, res, next) => {
  if (!req.user) {
    res.redirect('/login')
  } else {
    db.get.allCustomers
    .then(customers => {
      db.get.allPreferences
      .then(preferences => {
        db.get.allPizzas
        .then(pizzas => {
          db.get.allDrinks
          .then(drinks => {
            res.render('index', {customers, preferences, pizzas, drinks})
          })
        })
      })
    }).catch(next)
  }
})

app.route('/login')
.get((req, res, next) => {
  res.render('login')
})
.post(passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect: '/login'
}))

app.route('/delete/:table/:id')
.get((req, res, next) => {
  const { table, id } = req.params
  if (table === 'customers') {
    db.delInfo('preferences', 'customer_id', id)
    .then(() => {
      db.delInfo(table, 'id', id)
      .then(() => {
        res.redirect('/')
      }).catch(next)
    })
  } else {
    db.delInfo(table, 'id', id)
    .then(() => {
      res.redirect('/')
    }).catch(next)
  }
})

app.route('/logout')
.get((req, res, next) => {
  req.logout()
  res.redirect('/')
})

//APIs

app.route('/customers')
.get((req, res, next) => {
  db.get.allCustomers
  .then(customers => {
    res.send(customers)
  })
})
app.route('/pizzas')
.get((req, res, next) => {
  db.get.allPizzas
  .then(pizzas => {
    res.send(pizzas)
  })
})
app.route('/drinks')
.get((req, res, next) => {
  db.get.allDrinks
  .then(drinks => {
    res.send(drinks)
  })
})

app.listen(port, console.log(`Listening to port ${port}`))