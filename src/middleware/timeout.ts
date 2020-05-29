import Koa = require('koa')
import { TIMEOUT_MAX_AGE } from '@/config'
import { HttpError } from '@/models'

/**
 * 捕捉超时
 *
 * @author CaoMeiYouRen
 * @date 2020-05-25
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function timeout(ctx: Koa.Context, next: Koa.Next) {
    let t: any = 0
    const time = TIMEOUT_MAX_AGE // 设置超时时间
    await Promise.race([
        new Promise(((resolve, reject) => {
            t = setTimeout(() => {
                reject(new HttpError(408, '请求超时'))
            }, time)
        })),
        new Promise(((resolve, reject) => {
            // 使用一个闭包来执行下面的中间件
            (async function () {
                try {
                    await next()
                    clearTimeout(t)
                    resolve()
                } catch (e) {
                    clearTimeout(t)
                    reject(e)
                }
            })()
        })),
    ])
}