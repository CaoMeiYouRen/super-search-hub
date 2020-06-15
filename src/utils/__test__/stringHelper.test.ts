import should from 'should'
import { removeHtmlTag, html2Escape, escape2Html, restoreUrl } from '../stringHelper'
describe('stringHelper', () => {
    describe('removeHtmlTag', () => {
        it('return 123456', () => {
            should(removeHtmlTag('<em class=\"keyword\">123456</em>')).equal('123456')
        })
    })
    describe('html2Escape', () => {
        it('return &lt;&gt;&amp;&quot;&nbsp;', () => {
            should(html2Escape('<>&" ')).equal('&lt;&gt;&amp;&quot;&nbsp;')
        })
    })
    describe('escape2Html', () => {
        it('return <>&" ', () => {
            should(escape2Html('&lt;&gt;&amp;&quot;&nbsp;')).equal('<>&" ')
        })
    })
    describe('restoreUrl', () => {
        it('return https://www.baidu.com', () => {
            should(restoreUrl('https://www.baidu.com', 'https://www.baidu.com')).equal('https://www.baidu.com')
        })
        it('return http://www.baidu.com', () => {
            should(restoreUrl('//www.baidu.com', 'https://www.baidu.com')).equal('http://www.baidu.com')
        })
        it('return http://www.baidu.com', () => {
            should(restoreUrl('www.baidu.com', 'https://www.baidu.com')).equal('http://www.baidu.com')
        })
        it('return https://www.baidu.com/f/search/res', () => {
            should(restoreUrl('/f/search/res', 'https://www.baidu.com')).equal('https://www.baidu.com/f/search/res')
        })
        it('return http://www.baidu.com/f/search/res', () => {
            should(restoreUrl('/f/search/res', '//www.baidu.com')).equal('http://www.baidu.com/f/search/res')
        })
        it('return http://www.baidu.com/f/search/res', () => {
            should(restoreUrl('/f/search/res', 'www.baidu.com')).equal('http://www.baidu.com/f/search/res')
        })
    })
})