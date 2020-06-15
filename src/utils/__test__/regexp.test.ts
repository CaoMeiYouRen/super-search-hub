import should from 'should'
import { getCharset } from '../regexp'
describe('encrypt', () => {
    describe('getCharset', () => {
        it('返回 GBK', () => {
            should(getCharset('<meta charset="GBK">')).equal('GBK')
        })
        it('返回 GBK(大写)', () => {
            should(getCharset('<meta charset="gbk">')).equal('GBK')
        })
        it('返回 UTF-8', () => {
            should(getCharset('<meta charset="UTF-8">')).equal('UTF-8')
        })
        it('返回 空字符串', () => {
            should(getCharset('')).equal('')
        })
    })
})