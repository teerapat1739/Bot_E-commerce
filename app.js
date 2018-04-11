'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const PORT = process.env.PORT || 3000
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// ==============================CONNECT MONGOOSE
const { mongoose } = require('./db/index')

// ==============================Routes
const userRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
const productRouter = require('./routes/products')

// ==============================MODELS
const Category = require('./models/category')
const Product = require('./models/product')
const User = require('./models/user')


// if you noticed some errors or misspellings during the lessons don't worry we will find and correct them together later in the coure
app.set('view engine', 'ejs')
//morgan is a middleware which will help us to identify the clients who are accessing our application
const morgan = require('morgan')
const logger = require('./log')

app.use(bodyParser.urlencoded({ extends: true }))
app.use(bodyParser.json())
app.use(morgan('combined', { 'stream': logger.stream }))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))

// ==============================SESSION
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ url: 'mongodb://localhost/e-comerce'})
}))
app.use(passport.initialize())
app.use(passport.session())


// ==============================NAVBAR
app.use((req, res, next) => {
    Category.find().then(data => {
        res.locals.ctg = data
        console.log(res.locals.ctg)

        next()
    }, (e) => { throw new Error('Unable to find categories!') })
})

// ==============================SHOPPING CART
app.use((req, res, next) => {
    if(req.user) {
        let total = 0
        User.findById(req.user._id).then(data => {
            data.items.forEach(el => total += el.quantity)
            res.locals.cart = total
            next()
        }, (e) => { throw new Error('Unable to find user! ')})
    } else {
        res.locals.cart = 0
        next()
    }
  
})


// ==============================USE Routes
app.use(userRouter)
app.use(adminRouter)
app.use(productRouter)


// ==============================PASSPORT
passport.serializeUser(function (user, done) {
    done(null, user._id)
})
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})



// ==============================ERRORS
app.use(() => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
app.use((err, req, res, next) => {
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})


app.listen(PORT, () => logger.info(`${String.fromCodePoint(9749)}   is ready on port ${PORT}`))

module.exports = { app }