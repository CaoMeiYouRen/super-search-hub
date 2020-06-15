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
    const result = text.match(/charset="(.*?)">/)
    if (result && result.length >= 1) {
        return result[1]?.toUpperCase()
    }
    return ''
}

/**
 * 是否为URL
 *
 * @author CaoMeiYouRen
 * @date 2020-06-15
 * @export
 * @param {string} text
 * @returns {boolean}
 */
export function isURL(text: string): boolean {
    return /^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(text)
}

