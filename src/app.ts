import express = require('express')
import bodyParser = require('body-parser')
import routes from './routes'
import { timeout } from './middleware'
import { ROOT_URL } from './config'
import './db'
import './services'
// import { logger } from './middleware'
export class Server {
    /**
     * expressd的app对象
     *
     * @type {express.Application}
     * @memberof Server
     */
    public readonly app: express.Application
    constructor() {
        this.app = express()
        this.config()
    }
    /**
     *
     * 配置
     *
     * @author CaoMeiYouRen
     * @date 2020-05-24
     * @private
     */
    private config(): void {
        // this.app.use(logger)
        this.app.use(timeout)
        // 解析json
        this.app.use(bodyParser.json())
        // 解析url
        this.app.use(bodyParser.urlencoded({ extended: true }))
        // 挂载路由
        this.app.use(ROOT_URL, routes)
        // 处理404
        this.app.use((req, res, next) => {
            const err = new Error()
            err.name = 'Not Found'
            err.message = `Cannot ${req.method} ${req.path}`
            err['status'] = 404
            next(err)
        })
        // 处理错误
        this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err['status'] || 500).json({
                statusCode: err['status'] || 500,
                error: err.name,
                message: err.message,
            })
        })
    }
}