import dotenv = require('dotenv')
import path = require('path')
import fs = require('fs')
if (fs.existsSync('.env')) {
    const envFound = dotenv.config()
    if (envFound.error) {
        console.error(envFound.error)
    } else {
        if (process.env.NODE_ENV === 'development') {
            console.log(envFound.parsed)
        }
    }
}
const env = process.env

export const IS_DEBUG = env.NODE_ENV === 'development'
// 运行端口
export const PORT = Number(env.PORT || 8080)
// 路由根路径
export const ROOT_URL = env.ROOT_URL || ''
// 超时时间
export const MAX_TIME = Number(env.MAX_TIME || 5000)

const REDIS_PORT = Number(env.REDIS_PORT || 6379)
const REDIS_HOST = env.REDIS_HOST || '127.0.0.1'
/**
 * redis配置
 */
export const REDIS_CONFIG = {
    REDIS_URL: env.REDIS_URL || `redis://${REDIS_HOST}:${REDIS_PORT}`,
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD: env.REDIS_PASSWORD || '',
    REDIS_KEY_PREFIX: env.REDIS_KEY_PREFIX || 'my-redis',
}

