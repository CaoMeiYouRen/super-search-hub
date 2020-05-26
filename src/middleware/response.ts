import Koa = require('koa')
import status from 'http-status'
import _ from 'lodash'
import { Log } from '@/utils'
import { CACHE } from '@/config'
/**
 * 格式化返回结果
 *
 * @author CaoMeiYouRen
 * @date 2020-05-25
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function responseFormat(ctx: Koa.Context, next: Koa.Next) {
    await next()
    if (ctx.body) {
        const statusCode = ctx.status || 500
        const error = ctx.status >= 400 ? status[ctx.status] : undefined
        const message = ctx.body?.message
        const data = ctx.body?.data
        if (data) {
            ctx.body.data = Object.assign({
                language: 'zh-cn',
                ttl: CACHE.CACHE_AGE / 60,
                lastBuildDate: new Date(),
            }, data)
        }
        // 如果存在 data 和 message 就把 statusCode 和 error 合并进去
        // 如果 body 的 key 中含有 keyWords 外的 key ，则重新构造
        const keyWords = ['statusCode', 'error', 'message', 'data']
        if ((message || data) && _.difference(Object.keys(ctx.body), keyWords).length === 0) {
            ctx.body = Object.assign(ctx.body, { statusCode, error })
        } else { // 否则重新构造
            ctx.body = {
                statusCode,
                error,
                message,
                data: data || ctx.body,
            }
        }
    }
}

/**
 * 计算返回时间
 *
 * @author CaoMeiYouRen
 * @date 2020-05-25
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function responseTime(ctx: Koa.Context, next: Koa.Next) {
    const start = Date.now()
    await next()
    const rt = `${Date.now() - start}ms`
    ctx.set('X-Response-Time', rt)
    const size = ctx.response.length ? `${ctx.response.length}b` : ''
    Log.log(`${ctx.method} ${ctx.url} - ${ctx.status} ${rt} ${size}`)
}