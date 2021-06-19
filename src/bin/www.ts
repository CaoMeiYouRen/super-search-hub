/* eslint-disable no-fallthrough */
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
import { ENABLE_CLUSTER, ENABLE_PUSH, IS_DEBUG, IS_TEST, MODE_ENV, NODE_ENV, PORT } from '@/config'
import { Log, dingtalk, feedback } from '@/utils'
import { errorLogger } from '@/middleware'
const httpPort = normalizePort(PORT)
const numCPUs = os.cpus().length
if (ENABLE_CLUSTER && cluster.isMaster && !IS_DEBUG) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    app.on('error', onError)
    const server = app.listen(httpPort, () => {
        onListening()
    })
    if (IS_TEST) {
        Log.info('测试服务器已启动')
        setTimeout(() => {
            server.close()
            Log.info('测试服务器顺利关闭')
        }, 5000)
    }
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
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
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
    Log.info(`${workerId ? `worker ${workerId} ` : ''}运行地址为 http://127.0.0.1:${httpPort}`)
    console.log('################################################')
    if (!IS_TEST && ENABLE_PUSH && (workerId === '' || workerId === 1)) {
        setTimeout(() => {
            const title = '服务器已顺利启动'
            feedback(title).catch((e) => {
                console.error(e)
            })
        }, 5000)
    }
}

process.on('uncaughtException', (err) => {
    console.error(err)
    errorLogger.error(err)
    if (IS_TEST) {
        process.exit(1)
    }
    if (ENABLE_PUSH) {
        const title = '服务器出现 uncaughtException ，请及时处理'
        feedback(title, `${err.stack}`).catch((e) => {
            console.error(e)
        })
    }
})

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: ', p)
    errorLogger.error(p)
    if (IS_TEST) {
        process.exit(1)
    }
    if (ENABLE_PUSH) {
        const title = '服务器出现 unhandledRejection ，请及时处理'
        feedback(title, `${p}`).catch((e) => {
            console.error(e)
        })
    }
})