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

module.exports = logger