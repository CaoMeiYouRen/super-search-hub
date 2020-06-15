import Koa = require('koa')
import mime from 'mime'
import HttpStatus from 'http-status'
import _ from 'lodash'
import { Log } from '@/utils'
import { CACHE } from '@/config'
import { RssChannel, HttpStatusCode } from '@/models'
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

    if (mime.getExtension(ctx.type) === 'json' && ctx.body && !ctx.noFormat) { // 格式化错误和json
        const statusCode = ctx.status || HttpStatusCode.INTERNAL_SERVER_ERROR
        const error = ctx.status >= HttpStatusCode.BAD_REQUEST ? HttpStatus[ctx.status] : undefined
        const message = ctx.body?.message
        const data = ctx.body?.data

        // 如果存在 data 和 message 就把 statusCode 和 error 合并进去
        // 如果 body 的 key 中含有 keyWords 外的 key ，则重新构造
        const keyWords = ['statusCode', 'error', 'message', 'data']
        if ((message || data) && _.difference(Object.keys(ctx.body), keyWords).length === 0) {
            ctx.body = Object.assign(ctx.body, { statusCode, error })
        } else { // 否则重新构造
            ctx.body = {
                statusCode,
                message,
                error,
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

/**
 * RssChannel 格式化
 *
 * @author CaoMeiYouRen
 * @date 2020-06-15
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function rssFormat(ctx: Koa.Context, next: Koa.Next) {
    await next()
    const baseInfo = {
        title: 'Super Search Hub',
        webMaster: 'CaoMeiYouRen',
        language: 'zh-cn',
        description: 'Made with love by Super-Search-Hub',
        link: 'https://searchhub.cmyr.icu',
        lastBuildDate: new Date(),
        ttl: CACHE.CACHE_AGE / 60,
    }
    if (ctx.body instanceof RssChannel) {
        ctx.body = new RssChannel(Object.assign(baseInfo, ctx.body))
        return
    }
    const data = ctx.body?.data
    if (data instanceof RssChannel) {
        ctx.body.data = new RssChannel(Object.assign(baseInfo, data))
    }
}