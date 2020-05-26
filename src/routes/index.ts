import Router = require('koa-router')
import path = require('path')
import fs = require('fs-extra')

import { notFound, test, index } from '@/controllers'

const router = new Router()

// 根路径
router.all('/', index)

// 测试路由
router.all('/test/:status?', test)


const root = path.join(__dirname)
const dirs = fs.readdirSync(root)
console.log(dirs)
for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    if (!dir.includes('index')) { // 排除入口文件
        const r = require(path.join(root, dir))
        const route: Router = r?.default
        if (route) {
            router.use(`/${dir}`, route.routes(), route.allowedMethods())
        }
    }
}
// console.log(router.stack)

//
// 处理404
router.all('*', notFound)


// (async () => {
//     const root = path.join(__dirname)
//     const dirs = await fs.readdir(root)
//     console.log(dirs)
//     for (let i = 0; i < dirs.length; i++) {
//         const dir = dirs[i]
//         if (!dir.includes('index')) { // 排除入口文件
//             const r = await import(path.join(root, dir))
//             const route: Router = r.default

//             router.use(dir, route.routes(), route.allowedMethods())
//         }
//     }
//     //
//     // 处理404
//     router.all('*', notFound)
// })()

export default router