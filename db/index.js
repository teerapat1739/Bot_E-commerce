'use strict'

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/e-comerce',{useMongoClient: true,promiseLibrary:global.Promise})
mongoose.connect('mongodb://localhost/e-comerce',{promiseLibrary:global.Promise})

mongoose.Promise = global.Promise

module.exports = {mongoose}