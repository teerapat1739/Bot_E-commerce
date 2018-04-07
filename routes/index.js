'use strict'
const router = require('express').Router()
const logger = require('../log')

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router