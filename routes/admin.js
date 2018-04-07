'use strict'

const router = require('express').Router()
const logger = require('../log')
const Category = require('../models/category')


router.get('/admin',(req, res) => {
    res.render('admin')
})

router.post('/category', (req, res) => {
    let ctg = new Category({name: req.body.name})
    ctg.save().then( data => {
        console.log(data)
        res.render('admin', { msg: data.name })
    }, (e) => {
        throw new Error('Unable to save category')
    })
})


module.exports = router