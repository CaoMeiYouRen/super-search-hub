import morgan = require('morgan')
import path = require('path')
import fs = require('fs-extra')
import { timeFormat } from '../utils'
const logDir = path.join(__dirname, '../../logs')
morgan.token('time', (req, res) => {
    return timeFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSSZ')
})
morgan.format('app-combined', ':remote-addr - [:time] ":method :url HTTP/:http-version" :status - :response-time ms')
morgan.format('app-db-log', ':remote-addr - ":method :url HTTP/:http-version" :status - :response-time ms ":referrer" ":user-agent"')
morgan.format('json', JSON.stringify({
    ip: ':remote-addr',
    method: ':method',
    url: ':url',
    http: ':http-version',
    status: ':status',
    'response-time': ':response-time',
    referrer: ':referrer',
    'user-agent': ':user-agent',
}))