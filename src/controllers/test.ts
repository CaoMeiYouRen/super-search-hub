import Koa = require('koa')
import { HttpError } from '@/models'
/**
 * 测试用路由
 *
 * @author CaoMeiYouRen
 * @date 2020-05-26
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function test(ctx: Koa.Context, next: Koa.Next) {
    ctx.status = Number(ctx.params?.status || ctx.query?.status || ctx.request.body?.status || 200)
    if (ctx.query?.error) {
        throw new Error('出现了Error')
    }
    if (ctx.query?.httpError || ctx.query?.httperror || ctx.query?.http_error) {
        if (ctx.status < 400) {
            ctx.status = 500
        }
        throw new HttpError(ctx.status, '出现了HttpError')
    }
    // console.log(ctx.url)
    console.log(ctx.params)
    console.log(ctx.query)
    console.log(ctx.request.body)
    ctx.body = {
        message: 'Welcome to super-search-hub',
        data: {
            params: ctx.params,
            query: ctx.query,
            body: ctx.request.body,
        },
    }
}