import Koa = require('koa')
import { HttpError, HttpStatusCode } from '@/models'
import { TOKEN, IP_CONFIG, ENABLE_ACCESS_CONTROL } from '@/config'
import { globalCache } from './cache'
/**
 * 访问控制
 *
 * @author CaoMeiYouRen
 * @date 2020-06-04
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function accessControl(ctx: Koa.Context, next: Koa.Next) {
    if (ENABLE_ACCESS_CONTROL) {
        const ip = ctx.ipv4 || ''
        const token = ctx.query?.token
        // Token正确 或 白名单 内直接放行
        if (token === TOKEN || IP_CONFIG.IP_WHITELIST.includes(ip)) {
            ctx.auth = true
            await next()
            return
        }
        // 黑名单内直接拒绝
        if (IP_CONFIG.IP_BLACKLIST.includes(ip)) {
            throw new HttpError(HttpStatusCode.UNAUTHORIZED, '该IP已被拉入黑名单')
        }
        // 如果只配置了token，则没有token的都拒绝
        if (IP_CONFIG.IP_BLACKLIST.length === 0 && IP_CONFIG.IP_WHITELIST.length === 0 && token !== TOKEN) {
            throw new HttpError(HttpStatusCode.UNAUTHORIZED, '未提供token且该IP不在白名单中')
        }
        // 如果只配置了白名单，则不在白名单内的都拒绝
        if (IP_CONFIG.IP_BLACKLIST.length === 0 && IP_CONFIG.IP_WHITELIST.length > 0 && !IP_CONFIG.IP_WHITELIST.includes(ip)) {
            throw new HttpError(HttpStatusCode.UNAUTHORIZED, '未提供token且该IP不在白名单中')
        }
        // 其余情况均同意
    }
    // 拉黑ip的情况
    if (await globalCache.get(`ip-ban-${ctx.ipv4}`)) {
        throw new HttpError(HttpStatusCode.BAD_REQUEST, '您已被拉入访问黑名单！')
    }
    await next()
}