const winston = require('winston');
const dotenv = require('dotenv');
dotenv.config();

function buildProdLogger(){
    const prodLogger = winston.createLogger({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
        transports: [
            new winston.transports.File({ filename: './logs/debug.log', level: 'debug' }),
            new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
        ],
    });
    return prodLogger;
}


function buildDevLogger(){
    const devLogger = winston.createLogger({
        
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
        transports: [
            new winston.transports.Console({level: 'info'}),
        ],
    });
    return devLogger;
}


let logger = null;


if (process.env.NODE_ENV !== 'PROD') {
    logger = buildProdLogger();
} else {
    logger = buildDevLogger();
}


module.exports = logger;