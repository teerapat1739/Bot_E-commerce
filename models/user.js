'use strict'

const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const Schema1 = new mongoose.Schema({
    id: Number,
    name: String,
    photo: String,
    email: String,
    items: [{
        product_id: mongoose.Schema.Types.ObjectId,
        item: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 0 }
    }],
    history: [{
        amount: Number,
        card_email: String
    }]
})

Schema1.plugin(findOrCreate)

module.exports = mongoose.model('User', Schema1)