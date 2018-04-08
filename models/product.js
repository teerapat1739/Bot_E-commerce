'use strict'

const mongoose = require('mongoose')
const Schema3 = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    image: String,
    description: String
})


module.exports= mongoose.model('Product', Schema3)