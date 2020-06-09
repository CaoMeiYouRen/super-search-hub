import http = require('http')
import path = require('path')
import cluster = require('cluster')
import os = require('os')
import debug = require('debug')
import fs = require('fs-extra')
import colors = require('colors')
import moduleAlias from 'module-alias'
moduleAlias.addAlias('@', path.join(__dirname, '../'))
import { app } from '../app'
import { PORT, IS_DEBUG, ENABLE_CLUSTER, ENABLE_PUSH } from '@/config'
import { Log, feedback, dingtalk } from '@/utils'
import { errorLogger } from '@/middleware'
const httpPort = normalizePort(PORT)
const numCPUs = os.cpus().length
if (ENABLE_CLUSTER && cluster.isMaster && !IS_DEBUG) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    app.on('error', onError)
    app.listen(httpPort, () => {
        onListening()
    })
}
// const Debugger = debug('express:server')


function normalizePort(val: any): number {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    throw new Error('cannot resolve port.')
}

function onError(error: any): void {
    if (error.syscall !== 'listen') {
        throw error
    }
    const bind = typeof httpPort === 'string'
        ? `Pipe ${httpPort}`
        : `Port ${httpPort}`

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
    console.log('################################################')
    const workerId = cluster?.worker?.id || ''
    Log.info(`${workerId ? `worker ${workerId}` : ''} 运行地址为 http://127.0.0.1:${httpPort}`)
    console.log('################################################')
    if (ENABLE_PUSH && (!workerId || workerId === 1)) {
        setTimeout(() => {
            let title = '服务器已顺利启动'
            feedback(title) 
        }, 5000)
    }
}


process.on('uncaughtException', (err) => {
    console.error(err)
    errorLogger.error(err)
    if (ENABLE_PUSH) {
        let title = '服务器出现 uncaughtException ，请及时处理'
        feedback(title, `${err.stack}`).catch(e => {
            console.error(e)
        })
    }
})

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: ', p)
    errorLogger.error(p)
    if (ENABLE_PUSH) {
        let title = '服务器出现 unhandledRejection ，请及时处理'
        feedback(title, `${p}`).catch(e => {
            console.error(e)
        })
    }
})