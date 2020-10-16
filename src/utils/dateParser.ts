import { dateParser as date } from './date'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import { Log } from './helper'
dayjs.extend(utc)
dayjs.extend(customParseFormat)

/**
 * Convert unconventional i8n to the one supported by dayjs https://bit.ly/2psVwIJ
 * @param {String} x i8n string
 */
const i8nconv = (x: string) => {
    const c = {
        'zh-hans': 'zh-cn',
        'zh-chs': 'zh-cn',
        'zh-sg': 'zh-cn',
        'zh-hant': 'zh-hk',
        'zh-cht': 'zh-hk',
        'zh-mo': 'zh-hk',
    }
    for (const prop in c) {
        if (RegExp(`^${prop}$`, 'i').test(x)) {
            x = c[prop]
            break
        }
    }
    return x
}

/**
 * A function to convert a string of time based on specified format
 * @param {string} [html]                    A string of time to convert.
 * @param {string} [customFormat]  Format to parse html by dayjs.
 * @param {string} [lang=en]                 Language (must be supported by dayjs).
 * @param {number}    [htmlOffset=0]            UTC offset of html. It will be neglected if html contains timezone indicated by strings like "+0800".
 */
function tStringParser(html: string, customFormat: string, lang = 'en', htmlOffset = 0) {
    lang = i8nconv(lang)

    // Remove weekdays and comma from the string
    // dayjs v1.8.16 is not able to parse weekdays
    // https://github.com/iamkun/dayjs/blob/dev/docs/en/Plugin.md#list-of-all-available-format-tokens
    // We don't remove weekdayMini since the month may contains weekdayMini, like "六" in "六月"
    let removeStr: any[] = []
    if (lang !== 'en') {
        try {
            require(`dayjs/locale/${lang}`)
            if (/^zh/.test(lang)) {
                removeStr = removeStr.concat(['，'])
            }
            // Add locale
            dayjs.locale(lang)
        } catch (error) {
            Log.error(`Locale "${lang}" passed to dateParser is not supported by dayjs`)
            return date(html)
        }
    }
    Object.values(dayjs.Ls).forEach((k: any) => {
        ['weekdays', 'weekdaysShort'].forEach(x => {
            // eslint-disable-next-line no-prototype-builtins
            if (k.hasOwnProperty(x)) {
                const a = k[x].map(z => `${z}`)
                removeStr = removeStr.concat(...a)
            }
        })
    })
    removeStr = removeStr.concat([',', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    let htmlP = html
    removeStr.forEach(x => {
        // Order matters
        htmlP = htmlP.replace(RegExp(x, 'gi'), '')
    })

    const d = dayjs.utc(htmlP, customFormat)
    // console.log(htmlP,d)
    if (d.isValid()) {
        if (/[+-](\d{2}:?\d{2})/.test(html)) {
            return d.toDate().toUTCString()
        } else {
            return d.add(htmlOffset, 'h').toDate().toUTCString()
        }
    } else {
        return date(html)
    }
}

export { i8nconv, tStringParser }