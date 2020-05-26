import Koa = require('koa')
import { HttpError } from '@/models'

export * from './notFound'
export * from './test'

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
    ctx.status = 200
    ctx.body = {
        message: 'Welcome to super-search-hub',
    }
}