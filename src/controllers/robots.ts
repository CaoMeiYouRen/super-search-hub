import Koa = require('koa')
import { DISALLOW_ROBOT } from '@/config'

/**
 * 爬虫路由
 *
 * @author CaoMeiYouRen
 * @date 2020-05-29
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export function robots(ctx: Koa.Context, next: Koa.Next) {
    if (DISALLOW_ROBOT) {
        ctx.set('Content-Type', 'text/plain')
        ctx.body = 'User-agent: *\nDisallow: *'
    }
}