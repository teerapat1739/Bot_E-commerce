'use strict'

const mongoose = require('mongoose')
const Schema2 = new mongoose.Schema({
    name: {type: String, unique: true, lowercase: true}
})


module.exports= mongoose.model('Category', Schema2)