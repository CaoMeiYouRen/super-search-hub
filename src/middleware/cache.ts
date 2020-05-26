import Koa = require('koa')
import Lru = require('lru-cache')
import Redis = require('ioredis')
import { md5 } from '@/utils'
import { KoaCache } from '@/types'
import { CACHE, REDIS_CONFIG } from '@/config'
export const globalCache: KoaCache = {
    async get(key) {
        throw new Error('globalCache.get not implemented.')
    },
    async set(key, value, maxAge) {
        throw new Error('globalCache.set not implemented.')
    },
}
if (CACHE.CACHE_TYPE === CACHE.CACHE_TYPE_MEMORY) {
    const memoryCache = new Lru({
        maxAge: CACHE.CACHE_AGE * 1000,
        max: CACHE.CACHE_MAX,
        updateAgeOnGet: true,
    })
    globalCache.get = async (key) => {
        if (key) {
            let value: any = memoryCache.get(key)
            if (value) {
                value += ''
            }
            return value
        }
        return ''
    }
    globalCache.set = async (key, value, maxAge = CACHE.CACHE_AGE * 1000) => {
        if (!value || value === 'undefined') {
            value = ''
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return memoryCache.set(key, value, maxAge)
    }
} else if (CACHE.CACHE_TYPE === CACHE.CACHE_TYPE_REDIS) {
    const redis = new Redis({
        port: REDIS_CONFIG.REDIS_PORT,
        host: REDIS_CONFIG.REDIS_HOST,
        keyPrefix: REDIS_CONFIG.REDIS_KEY_PREFIX,
        password: REDIS_CONFIG.REDIS_PASSWORD,
    })
    globalCache.get = async (key) => {
        if (key) {
            let value: any = await redis.get(key)
            if (value) {
                value += ''
            }
            return value
        }
        return ''
    }
    globalCache.set = async (key, value, maxAge = CACHE.CACHE_AGE * 1000) => {
        if (!value || value === 'undefined') {
            value = ''
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return redis.set(key, value, 'PX', maxAge)
    }
}
/**
 * 缓存中间件
 *
 * @author CaoMeiYouRen
 * @date 2020-05-26
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function cache(ctx: Koa.Context, next: Koa.Next) {
    // 需要缓存的方法
    const methods = ['GET', 'HEAD']
    const hash = md5(ctx.url)
    // 是否禁用缓存
    const nocache = ctx.params?.nocache || ctx.query?.nocache || ctx.request.body?.nocache
    if (methods.includes(ctx.method) && !nocache) {
        let value = await globalCache.get(hash)
        if (value) {
            try {
                value = JSON.parse(value)
            } catch (error) {
            }
            ctx.body = value
            ctx.set({
                'X-Koa-Cache': 'true',
            })
            return
        }
    }
    await next()
    if (methods.includes(ctx.method) && !nocache && ctx.body) {
        await globalCache.set(hash, ctx.body)
    }
}