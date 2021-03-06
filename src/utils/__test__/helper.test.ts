import should from 'should'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { timeFormat, sleep, dataFormat, timeFromNow, ipFormat } from '../helper'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

describe('helper', () => {
    describe('timeFormat', () => {
        it('返回 2019-12-26 16:49:53', () => {
            const date = '2019-12-26T08:49:53.325Z'
            timeFormat(date).should.be.equal('2019-12-26 16:49:53')
        })
    })
    describe.skip('sleep', () => {
        it('延时 1000 毫秒', (done) => {
            const start = Date.now()
            const time = 1000
            sleep(time).then(() => {
                const end = Date.now()
                should((end - start) >= time).be.ok()
                done()
            })
        })
    })
    describe('dataFormat', () => {
        it('返回 1023.00 B', () => {
            dataFormat(1023).should.equal('1023.00 B')
        })
        it('返回 1023.00 GB', () => {
            dataFormat(1023 * 1024 * 1024 * 1024).should.equal('1023.00 GB')
        })
    })
    describe('timeFromNow', () => {
        it('返回 998.00 ms', () => {
            timeFromNow(998).should.equal('998.00 ms')
        })
        it('返回 7.00 day', () => {
            timeFromNow(7 * 24 * 60 * 60 * 1000).should.equal('7.00 day')
        })
    })
    describe('ipFormat', () => {
        it('::ffff:127.0.0.1 => 127.0.0.1', () => {
            const ip = '::ffff:127.0.0.1'
            should(ipFormat(ip)).be.equal('127.0.0.1')
        })
        it('127.0.0.1 => 127.0.0.1', () => {
            const ip = '127.0.0.1'
            should(ipFormat(ip)).be.equal('127.0.0.1')
        })
    })
})