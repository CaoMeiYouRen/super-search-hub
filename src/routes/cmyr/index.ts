import Koa = require('koa')

export async function index(ctx: Koa.Context, next: Koa.Next) {
    ctx.status = 200
    ctx.body = {
        message: 'Welcome to cmyr',
    }
}