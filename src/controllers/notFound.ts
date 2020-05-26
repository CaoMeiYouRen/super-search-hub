import Koa = require('koa')
import { HttpError } from '@/models'
/**
 * 处理404
 *
 * @author CaoMeiYouRen
 * @date 2020-05-26
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function notFound(ctx: Koa.Context, next: Koa.Next) {
    throw new HttpError(404, `Cannot ${ctx.method} ${ctx.path}`)
}