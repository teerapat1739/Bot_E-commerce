'use strict'

const router = require('express').Router()
const stripe = require('stripe')('sk_test_V5IrPKQYmi6xGEmw9W1M3Wd3')
const logger = require('../log')
const Category = require('../models/category')
const Product = require('../models/product')
const User = require('../models/user')
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

router.post('/cart', async (req, res) => {
    let product = {
        product_id: req.body.single_id,
        item: req.body.name,
        price: req.body.price,
        image: req.body.image,
        quantity: req.body.quantity,
        total_price: req.body.total
    }
    console.log(product)
    
    try{
        let a = await User.findById(req.user._id).update({$push: {items: (product)}}).exec()
        let b = await User.findById(req.user._id)
        res.redirect('/cart')
    } catch (err) {
        throw new Error(err)
    }
})

router.get('/cart',(req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.user._id).then(data => {

            console.log(data.items)
            
            res.render('cart', {arr: data.items})
        }, (e) => { throw new Error('Unable to fibnd user!')})
    } else {
        res.redirect('/')
    }
})


router.get('/remove', (req, res) => {
    console.log('remove')
    User.findById(req.user._id).update({$pull: {items: {product_id: req.query.name}}}).then(data => {
        res.redirect('/cart')
    }, (e) => { throw new Error('Unable to delete from cart!') })
})

router.post("/charge", (req, res) => {
    let amount = req.body.amount * 100
  
    stripe.customers.create({
       email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
           currency: "usd",
           customer: customer.id
      }))
    .then(charge => {
        console.log(charge)
        let chargeData = {
            amount: charge.amount / 100,
            card_email: charge.source.name
        }
        console.log("UserId >>>>>>>>>>>>>> "+req.user._id)
        
        User.update({_id: req.user._id}, {
            $set: {items: []},
            $push: {history: (chargeData)}
        }).then(data => {
            console.log(data)
        }, (e) => { throw new Error('Problems with history!')})
        res.render('success')
    }, (e) => { throw new Error('Problems with payment!')})
  })
  

module.exports = router