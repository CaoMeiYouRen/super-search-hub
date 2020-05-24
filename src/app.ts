import Koa = require('koa')
import Router = require('koa-router')
import { ROOT_URL } from './config'
import { Log } from './utils'
const app = new Koa()
app.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    Log.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// response
// app.use(async ctx => {
//     ctx.body = 'Hello World'
// })

let home = new Router()

// 子路由1
home.get('/', async (ctx) => {
    let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
    ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async (ctx) => {
    ctx.body = '404 page!'
}).get('/helloworld', async (ctx) => {
    ctx.body = 'helloworld page!'
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

export { app }