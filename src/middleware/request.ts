import Koa = require('koa')
import { HttpError } from '@/models'
import { ITEM_LIMIT } from '@/config'
import { ipFormat } from '@/utils'

export async function requestCheck(ctx: Koa.Context, next: Koa.Next) {
    await next()
}
/**
 * 转换请求
 *
 * @author CaoMeiYouRen
 * @date 2020-06-04
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function requestTransform(ctx: Koa.Context, next: Koa.Next) {
    ctx.query.page = Number(ctx.query?.page || 1)
    ctx.query.limit = Number(ctx.query?.limit || ITEM_LIMIT)
    await next()
}
export async function requestIpTransform(ctx: Koa.Context, next: Koa.Next) {
    ctx.ipv4 = ipFormat(ctx.ip)
    await next()
}