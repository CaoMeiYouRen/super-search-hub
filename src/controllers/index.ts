import Koa = require('koa')
import path = require('path')
import fs = require('fs-extra')

export * from './notFound'
export * from './test'
export * from './robots'


/**
 * 根路径响应
 *
 * @author CaoMeiYouRen
 * @date 2020-05-26
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function index(ctx: Koa.Context, next: Koa.Next) {
    let data = {
        ip: ctx.ip,
    }
    if (await fs.pathExists('package.json')) {
        try {
            const packages = JSON.parse((await fs.readFile('package.json')).toString())
            const { name, description, version } = packages
            data = Object.assign({ name, description, version }, data)
        } catch (error) {

        }
    }
    ctx.status = 200
    ctx.body = {
        message: 'Welcome to super-search-hub',
        data: Object.assign({ date: new Date() }, data),
    }
}