import Koa = require('koa')
import { HttpError, HttpStatusCode } from '@/models'
/**
 * 处理404
 *
 * @author CaoMeiYouRen
 * @date 2020-05-26
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export function notFound(ctx: Koa.Context, next: Koa.Next) {
    throw new HttpError(HttpStatusCode.NOT_FOUND, `Cannot ${ctx.method} ${ctx.path}`)
}