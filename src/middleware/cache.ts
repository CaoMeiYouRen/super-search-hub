import Koa = require('koa')
import Lru = require('lru-cache')
import Redis = require('ioredis')
/* eslint-disable @typescript-eslint/require-await */
import mime from 'mime'
import { md5 } from '@/utils'
import { KoaCache } from '@/types'
import { CACHE, IS_DEBUG, REDIS_CONFIG } from '@/config'
import { CacheType } from '@/models'
export const globalCache: KoaCache = {
    async get(key) {
        throw new Error('globalCache.get not implemented.')
    },
    async set(key, value, maxAge) {
        throw new Error('globalCache.set not implemented.')
    },
}
if (CACHE.CACHE_TYPE === CacheType.MEMORY) {
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
                try {
                    value = JSON.parse(value)
                } catch (error) {
                }
            }
            return value
        }
        return ''
    }
    globalCache.set = async (key, value, maxAge = CACHE.CACHE_AGE) => {
        if (!value || value === 'undefined') {
            value = ''
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return memoryCache.set(key, value, maxAge * 1000)
    }
} else if (CACHE.CACHE_TYPE === CacheType.REDIS) {
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
                try {
                    value = JSON.parse(value)
                } catch (error) {
                }
            }
            return value
        }
        return ''
    }
    globalCache.set = async (key, value, maxAge = CACHE.CACHE_AGE) => {
        if (!value || value === 'undefined') {
            value = ''
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return redis.set(key, value, 'PX', maxAge * 1000)
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
    ctx.cache = globalCache
    // 不缓存的路由
    // const noCacheRoutes = ['/status']
    // 需要缓存的方法
    const methods = ['GET', 'HEAD']
    const types = ['json', 'xml']
    const hash = md5(ctx.url)

    // 是否禁用缓存
    const noCache = ctx.params?.nocache || ctx.query?.nocache || ctx.request.body?.nocache || ctx.params?.noCache || ctx.query?.noCache || ctx.request.body?.noCache || IS_DEBUG
    // const noCache = false
    if (methods.includes(ctx.method) && !noCache) {
        const value = await ctx.cache.get(hash)
        if (value) {
            ctx.body = value
            ctx.set({
                'X-Koa-Cache': 'true',
            })
            return
        }
    }
    await next()
    if (methods.includes(ctx.method) && types.includes(mime.getExtension(ctx.type) || '') && !noCache && !ctx.noCache && ctx.body) {
        await ctx.cache.set(hash, ctx.body)
    }
}