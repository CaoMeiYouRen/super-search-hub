import should from 'should'
import { removeHtmlTag, html2Escape, escape2Html } from '../stringHelper'
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
})