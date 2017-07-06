const express = require('express')
const db = require('./models/queries')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const app = express()
const port = 3000


var test = null

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser( (user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  db.get.adminByUsername(username)
  .then( user => done(null, user))
})

passport.use(new LocalStrategy((username, password, done) => {
  db.get.adminByUsernamePassword(username, password)
  .then( user => {
      if (user) {
        test = user
        return done(null, user[0]) 
      } else { 
        return done(null, false) 
      }
  })
}))

app.route('/')
  .get((req, res, next) => {
    if (!test) {
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
    console.log('im in the delete route')
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
    test = null
    res.redirect('/')
  })


app.listen(port, console.log(`Listening to port ${port}`))


























