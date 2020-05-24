import debug = require('debug')
import http = require('http')
import path = require('path')
import fs = require('fs')
import colors = require('colors')
import { PORT } from '../config'
import { app } from '../app'
// const Debugger = debug('express:server')

/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(PORT)

app.on('error', onError)
// app.on('listening', onListening)
app.listen(httpPort, () => {
    onListening()
})
// const httpServer = http.createServer(app)
// httpServer.on('error', onError)
// httpServer.on('listening', onListening)
// httpServer.listen(httpPort)

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any): number {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    throw new Error('cannot resolve port.')
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any): void {
    if (error.syscall !== 'listen') {
        throw error
    }
    const bind = typeof httpPort === 'string'
        ? `Pipe ${httpPort}`
        : `Port ${httpPort}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
    console.log(`
################################################
    ${colors.green(`运行地址为  http://127.0.0.1:${httpPort}`)}
################################################`)
    // console.log(`接口文档http://127.0.0.1:${httpPort}/robot/v2.0/docs/`)
}
process.on('uncaughtException', (err) => {
    console.error(err)
})
process.on('unhandledRejection', (reason: any, p) => {
    console.error('Unhandled Rejection at: ', p, ' reason: ', reason.stack)
})
