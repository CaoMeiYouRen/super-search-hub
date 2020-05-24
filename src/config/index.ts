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

// 运行端口
export const PORT = process.env.PORT || 8080
// 路由根路径
export const ROOT_URL = process.env.ROOT_URL || '/'
