'use strict'

const router = require('express').Router()
const logger = require('../log')
const Category = require('../models/category')
const Product = require('../models/product')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const signature = {
    jpg: 'ffd8ffe0',
    jpg_exif: 'ffd8ffe1',
    png: '89504e47',
    gif: '47494638'
}

let checkSignature = value => value === signature.jpg || value === signature.jpg_exif || value === signature.gif || value === signature.png ? true : false

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


router.post('/product', (req, res) => {
    let upload = multer({
        storage: multer.memoryStorage()
    }).single('image')

    upload(req, res, err => {
        let buffer = req.file.buffer
        let sgnt = buffer.toString('hex', 0, 4)
        console.log(sgnt)
        let filename = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname)        
        console.log(filename)
        if(checkSignature(sgnt)) {
            let product = new Product({
                category: req.body.ctg,
                name: req.body.name,
                price: req.body.price,
                image: filename,
                description: req.body.des
            })
            product.save().then( data => {
                fs.writeFile('./public/uploads/'+filename, buffer, 'binary', err => {
                    if(err) {
                        Product.findByIdAndRemove(data._id).then(data => {
                            console.log(data)
                        }, (e) => {
                            console.log('Unable to remove from db', e)
                            
                        })
                        throw new Error('Unable to write file!')
                    }
                    res.render('admin',{msg: 'File upload successfully!'})
                })
            },(e)  => {throw new Error('Unable to save to DB')})
        }else {
            res.render('admin',{msg:' Remember: Only images!'})
        }
    })
})

router.get('/dropdown', (req, res) => {
    console.log(req.query.name)
    Product.find({category: req.query.name}).then(data => {
        res.render('admin',{product: data})
    }, (e) => {throw new Error('Unable to find Product!')})
})

router.get('/delete', (req, res) => {
    Product.findByIdAndRemove(req.query.name).then(data => {
        fs.unlink(`./public/uploads/${data.image}`, err => {
            if(err) throw new Error('Unable to delete file!')
        })
        res.redirect('admin')
    }, (e) => {throw new Error('delete product!')})
})

module.exports = router