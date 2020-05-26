import moment = require('moment')
import colors = require('colors')
import { IS_DEBUG } from '@/config'

/**
 * 延时一段时间
 *
 * @author CaoMeiYouRen
 * @date 2019-08-26
 * @export
 * @param {number} time
 * @returns
 */
export async function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
}
/**
 * 要格式化的时间戳、字符串或日期对象
 *
 * @author CaoMeiYouRen
 * @date 2019-08-22
 * @export
 * @param {(number | string | Date)} [date=Date.now()]
 * @param {string} [pattern='YYYY-MM-DD HH:mm:ss']
 * @returns {string}
 */
export function timeFormat(date: number | string | Date = Date.now(), pattern: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment(date).format(pattern)
}
/**
 *
 * @param {*} str 打印当前时间，可以附加文字
 */
export function printTime(str: any) {
    console.log(`${timeFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSS')} : ${JSON.stringify(str)}`)
}
/**
 * 调试输出
 */
export const Log = {
    log(msg: any) {
        if (IS_DEBUG) {
            console.log(`${colors.yellow(timeFormat(Date.now(), 'HH:mm:ss.SSS'))} : ${colors.green(typeof msg === 'string' ? msg : JSON.stringify(msg))}`)
        }
    },
    error(msg: any) {
        console.error(`${colors.yellow(timeFormat(Date.now(), 'HH:mm:ss.SSS'))} :`, colors.red(msg))
    },
}