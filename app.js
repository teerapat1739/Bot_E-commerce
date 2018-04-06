'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// app.set('port', (process.env.PORT || 3000))
const PORT  = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extends: true} ))
app.use(bodyParser.json())
// if you noticed some errors or misspellings during the lessons don't worry we will find and correct them together later in the coure
app.set('view engine', 'ejs')
//morgan is a middleware which will help us to identify the clients who are accessing our application
const morgan = require('morgan')
const winston = require('winston')
const timeFormat = () => new Date().toLocaleTimeString()
let logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            level: 'info',
            colorize: true
        }),
        new (winston.transports.File)({
            name: 'error',
            filename : 'errors.log',
            level: 'error',
            timestamp: timeFormat,
            handleExceptions: true
        }),
        new (winston.transports.File)({
            name: 'server',
            filename: 'server.log',
            level: 'info',
            timestamp: timeFormat
        }),
    ],
    exitOnError: false
})

logger.stream = {
    write: function(message, encoding){
        logger.info(message)
    }
}

app.use(morgan('combined', { 'stream': logger.stream }))

logger.emitErrs = false
logger.error('Error for log file!')


app.use(morgan('dev'))
app.get('/', (req, res) => {
    res.status(200).json({name: 'to'})
})
// const sum = require('./temp')

// sum(100).then( result => {
//     console.log(result)
// }).catch( error => console.log(error))

// const fs = require('fs')
// fs.readFile('file.txt', (err, data) => {
//     throw new Error('Something wrong!')
//     console.log(data)
// })

let debug = require('./debug')

app.listen(PORT, () => logger.info(`${String.fromCodePoint(9749)}   is ready on port ${PORT}`)
)
// app.listen(app.get('port'),() => {
//     console.log('running on port', app.get('port'))

module.exports = {app}