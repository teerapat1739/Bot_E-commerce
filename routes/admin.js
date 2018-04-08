'use strict'

const router = require('express').Router()
const logger = require('../log')
const Category = require('../models/category')
const Product = require('../models/product')


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


//upload file will use Multer module 


module.exports = router