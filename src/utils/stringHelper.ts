/**
 * 提取HTML页面中的编码
 *
 * @author CaoMeiYouRen
 * @date 2020-06-15
 * @export
 * @param {string} text
 * @returns
 */
export function getCharset(text: string) {
    if (!text) {
        return text
    }
    const result = text.match(/charset="(.*?)">/m)
    if (result && result.length >= 1) {
        return result[1]?.toUpperCase()
    }
    return ''
}
/**
 * 移除所有HTML标签。例如\<a\>123\</a\>
 *
 * @author CaoMeiYouRen
 * @date 2020-06-11
 * @export
 * @param {string} str
 * @returns
 */
export function removeHtmlTag(str: string) {
    return str ? str.replace(/<[^>]*>/mg, '') : str
}
/**
 * 转义html特殊字符
 *
 * @author CaoMeiYouRen
 * @date 2020-06-12
 * @export
 * @param {string} sHtml
 * @returns
 */
export function html2Escape(sHtml: string) {
    return sHtml.replace(/[<>&" ]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', ' ': '&nbsp;' }[c]))
}
/**
 * 反转义html特殊字符
 *
 * @author CaoMeiYouRen
 * @date 2020-06-12
 * @export
 * @param {string} str
 * @returns
 */
export function escape2Html(str: string) {
    const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, (all, t) => arrEntities[t])
}

/**
 * 还原 URL
 *
 * @author CaoMeiYouRen
 * @date 2020-06-15
 * @export
 * @param {string} originUrl 原URL
 * @param {string} baseUrl 基础URL
 */
export function restoreUrl(originUrl: string, baseUrl: string) {
    if (/^\/\//.test(originUrl)) { // 缺少http前缀
        return `http:${originUrl}`
    }
    if (/^\//.test(originUrl)) { // 缺少主域名
        originUrl = baseUrl + originUrl
    }
    if (/^\/\//.test(originUrl)) { // 缺少http前缀
        return `http:${originUrl}`
    }
    if (!/^(https?):\/\//.test(originUrl)) {
        return `http://${originUrl}`
    }
    return originUrl
}

/**
 * 提取磁力链接
 *
 * @author CaoMeiYouRen
 * @date 2020-06-16
 * @export
 * @param {string} text
 * @returns
 */
export function getBittorrent(text: string) {
    if (!text) {
        return text
    }
    const result = text.match(/(magnet:\?xt=urn:btih:)[0-9a-zA-Z]{32,40}([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])?/m)
    if (result && result.length >= 1) {
        return result[0]
    }
    return ''
}