import os = require('os')
import path = require('path')
import fs = require('fs-extra')
import cluster = require('cluster')
import Koa = require('koa')
import pidusage from 'pidusage'
import git from 'git-rev-sync'
import { dataFormat, timeFromNow } from '@/utils'
// 仅开放环境下显示gitHash
let gitHash: any
try {
    gitHash = git.long()
} catch (e) {
    gitHash = process.env.HEROKU_SLUG_COMMIT || process.env.VERCEL_GITHUB_COMMIT_SHA
}

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
    const stat = await pidusage(process.pid)
    let data = {
        nodeVersion: process.versions.node,
        gitHash,
        ip: ctx.ip,
        workerId: cluster?.worker?.id,
        stat: {
            memory: dataFormat(stat.memory),
            cpu: `${stat.cpu} %`,
            runtime: timeFromNow(stat.elapsed),
        },
        os: {
            type: os.type(),
            release: os.release(),
            cpuArch: os.arch(),
            cupNum: os.cpus().length,
            loadavg: os.loadavg(),
            totalmem: dataFormat(os.totalmem()),
            freemem: dataFormat(os.freemem()),
            uptime: timeFromNow(os.uptime() * 1000),
        },
    }
    if (await fs.pathExists('package.json')) {
        try {
            const packages = await fs.readJSON('package.json')
            const { name, description, version } = packages
            data = Object.assign({ name, version, description }, data)
        } catch (error) {

        }
    }
    ctx.status = 200
    ctx.body = {
        data: Object.assign({ date: new Date() }, data),
    }
    ctx.noCache = true
}