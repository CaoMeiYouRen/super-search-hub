import http = require('http')
import request = require('supertest')
import should from 'should'
import { app } from '../src/app'
// import { PORT } from '../src/config'
const PORT = Math.floor(Math.random() * 55535 + 10000)
let server: http.Server
describe('app e2e测试', () => {
    before((done) => {
        server = app.listen(PORT, () => {
            console.log(`测试服务器已启动：http://127.0.0.1:${PORT}`)
            done()
        })
    })
    after((done) => {
        server.close((err) => {
            if (err) {
                done(err)
                return
            }
            done()
        })
    })
    it('状态路由，应该成功返回当前状态', (done) => {
        request(server).get('/status').expect(200, (err, res) => {
            if (err) {
                done(err)
                return
            }
            should(res.ok).ok()
            done()
        })
    })
    it('应该返回 400', (done) => {
        request(server).get('/400').expect(400, (err, res) => {
            if (err) {
                done(err)
                return
            }
            should(res.status === 400).ok()
            done()
        })
    })
    it('应该成功捕捉到 404 错误', (done) => {
        request(server).get('/404?keyword=888888').expect(404, (err, res) => {
            if (err) {
                done(err)
                return
            }
            should(res.status === 404).ok()
            done()
        })
    })
    it('应该成功捕捉到 400 HttpError ', (done) => {
        request(server).get('/test/?status=400&httpError=true').expect(400, (err, res) => {
            if (err) {
                done(err)
                return
            }
            should(res.status === 400).ok()
            done()
        })
    })
    it.skip('应该成功捕捉到 Error ', (done) => {
        request(server).get('/test/?error=true').expect(500, (err, res) => {
            if (err) {
                done(err)
                return
            }
            should(res.status === 500).ok()
            done()
        })
    })
})