import Koa = require('koa')
import { HttpError } from '@/models'
import { ITEM_LIMIT } from '@/config'

export async function requestCheck(ctx: Koa.Context, next: Koa.Next) {

}
export async function requestTransform(ctx: Koa.Context, next: Koa.Next) {
    ctx.query.page = Number(ctx.query?.page || 1)
    ctx.query.limit = Number(ctx.query?.limit || ITEM_LIMIT)
    await next()
}