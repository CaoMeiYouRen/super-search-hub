import Koa = require('koa')
import { HttpError } from '@/models/error'
export async function catchError(ctx: Koa.Context, next: Koa.Next) {
    try {
        await next()
    } catch (e) {
        let message: any
        let statusCode = 500
        if (e instanceof HttpError) {
            message = e.message
            statusCode = e.statusCode
        } else if (e instanceof Error) {
            message = e.stack
        } else {
            message = 'Unknown Error'
            console.error(e)
        }
        ctx.status = statusCode
        ctx.body = { message }
    }
}