import os = require('os')
import path = require('path')
import fs = require('fs-extra')
import Koa = require('koa')
import pidusage from 'pidusage'
import { dataFormat, timeFromNow } from '@/utils'


/**
 * 状态监测路由
 *
 * @author CaoMeiYouRen
 * @date 2020-05-26
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function status(ctx: Koa.Context, next: Koa.Next) {
    const stats = await pidusage(process.pid)
    let data = {
        nodeVersion: process.versions.node,
        ip: ctx.ip,
        stat: {
            memory: dataFormat(stats.memory),
            cpu: `${stats.cpu} %`,
            runtime: timeFromNow(stats.elapsed),
        },
        os: {
            type: os.type(),
            release: os.release(),
            cpuArch: os.arch(),
            cupNum: os.cpus().length,
            totalmem: dataFormat(os.totalmem()),
            freemem: dataFormat(os.freemem()),
            uptime: timeFromNow(os.uptime() * 1000),
        },
    }
    if (await fs.pathExists('package.json')) {
        try {
            const packages = JSON.parse((await fs.readFile('package.json')).toString())
            const { name, description, version } = packages
            data = Object.assign({ name, version, description }, data)
        } catch (error) {

        }
    }
    ctx.status = 200
    ctx.body = {
        data: Object.assign({ date: new Date() }, data),
    }
}