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
    return str ? str.replace(/<[^>]*>/g, '') : str
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
    return sHtml.replace(/[<>&" ]/g, (c) => {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', ' ': '&nbsp;' }[c]
    })
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
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, (all, t) => {
        return arrEntities[t]
    })
}