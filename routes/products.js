'use strict'

const router = require('express').Router()
const logger = require('../log')
const Category = require('../models/category')
const Product = require('../models/product')

router.get('/navbar', (req, res) => {
    const perPage = 8
})