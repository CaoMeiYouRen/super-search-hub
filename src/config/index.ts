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
// 运行端口
export const PORT = env.PORT || 8080
// 路由根路径
export const ROOT_URL = env.ROOT_URL || '/'
// 超时时间
export const MAX_TIME = Number(env.MAX_TIME || 5000)

