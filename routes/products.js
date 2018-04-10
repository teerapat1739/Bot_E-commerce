'use strict'

const router = require('express').Router()
const logger = require('../log')
const Category = require('../models/category')
const Product = require('../models/product')
let temp = undefined

router.get('/navbar', (req, res) => {
    const perPage = 8
    const page = req.query.page || 1
    const ctg = req.query.name

    Product.find({category: req.query.name})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(products => {
            Product.count({category: req.query.name})
                .then(count => {
                    res.render('product', {
                        navbar: products,
                        current: page,
                        pages: Math.ceil(count/perPage),
                        category:ctg
                    })
                }, (e) => {throw new Error('Unable to count!')})
        }, (e) => {throw new Error('Unable to find this product!')})
})

router.get('/single', (req, res) => {
    if (req.isAuthenticated() && temp !== undefined) {
        Product.findById(temp).then(data => {
            res.render('single', {one: data})
            temp=undefined
        }, (e) => {throw new Error('Unable to find this product!')})
    } else {
        temp = req.query.name
        res.redirect('/login')
    }
})

module.exports = router