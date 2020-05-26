import Koa = require('koa')
import { HttpError } from '@/models/error'
import { IS_DEBUG } from '@/config'
import { Log } from '@/utils'
import { errorLogger } from './logger'
export async function catchError(ctx: Koa.Context, next: Koa.Next) {
    try {
        await next()
    } catch (e) {
        let message: any = 'Unknown Error'
        let statusCode = 500
        if (e instanceof HttpError) {
            message = e.message
            statusCode = e.statusCode
            if (statusCode >= 500) {
                Log.error(e)
                errorLogger.error(message)
            }
        } else if (e instanceof Error) {
            // 开发阶段打印堆栈信息，否则打印message
            message = IS_DEBUG ? e.stack : e.message
            Log.error(e)
            errorLogger.error(message)
        } else {
            Log.error(e)
        }
        ctx.status = statusCode
        ctx.body = { message }
    }
}