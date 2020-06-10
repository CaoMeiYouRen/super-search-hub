import Koa = require('koa')
import { HttpError, HttpStatusCode } from '@/models'
import { IS_DEBUG, ENABLE_PUSH } from '@/config'
import { Log, feedback } from '@/utils'
import { errorLogger } from './logger'
export async function catchError(ctx: Koa.Context, next: Koa.Next) {
    try {
        await next()
    } catch (e) {
        let message: any = 'Unknown Error'
        let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
        if (e instanceof HttpError) {
            message = e.message
            statusCode = e.statusCode
        } else if (e instanceof Error) {
            // 开发阶段打印堆栈信息，否则打印 message
            message = IS_DEBUG ? e.stack : e.message
            if (ENABLE_PUSH) {
                const title = '服务器出现非 HttpError ，请及时处理'
                await feedback(title, `${e.stack}`)
            }
        }
        if (statusCode >= HttpStatusCode.INTERNAL_SERVER_ERROR) {
            Log.error(e)
            errorLogger.error(e)
        }
        ctx.status = statusCode
        ctx.body = { message }
    }
}