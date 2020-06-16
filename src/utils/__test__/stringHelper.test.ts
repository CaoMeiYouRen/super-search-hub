import should from 'should'
import { removeHtmlTag, html2Escape, escape2Html, restoreUrl, getCharset, getBittorrent } from '../stringHelper'
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
    describe('getBittorrent', () => {
        it('返回 bt链接', () => {
            let bt = '<a href="http://www.nyaa.se/?page%3Ddownload%26tid%3D801097">Torrent Link</a><br />\n<a href="magnet:?xt=urn:btih:QSBZA65STRE6QTU6KBVSTH33TF2NZRND&tr=http://d-shiro.yuuki-chan.xyz:6881/announce&tr=http://open.nyaatorrents.info:6544/announce&tr=udp://tracker.openbittorrent.com:80/announce">Magnet Link</a><br />\n<a href="https://www.tokyotosho.info/details.php?id=979242">Tokyo Tosho</a><br />\nSize: 449.58MB<br />\nAuthorized: N/A<br />\nSubmitter: Anonymous<br />\n'
            should(getBittorrent(bt)).equal('magnet:?xt=urn:btih:QSBZA65STRE6QTU6KBVSTH33TF2NZRND&tr=http://d-shiro.yuuki-chan.xyz:6881/announce&tr=http://open.nyaatorrents.info:6544/announce&tr=udp://tracker.openbittorrent.com:80/announce')
        })
    })
})