import express = require('express')
import connectTimeout = require('connect-timeout')

/**
 * 处理超时中间件
 *
 * @author CaoMeiYouRen
 * @date 2020-05-24
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function timeout(req: express.Request, res: express.Response, next: express.NextFunction) {
    const time = 30 * 1000
    connectTimeout('30s')
    // 设置所有HTTP请求的超时时间
    req.setTimeout(time, () => {
        return res.status(408).json({ message: '请求超时' })
    })
    // 设置所有HTTP请求的服务器响应超时时间
    res.setTimeout(time, () => {
        return res.status(408).json({ message: '响应超时' })
    })
    next()
}