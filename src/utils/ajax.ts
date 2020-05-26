import axios, { AxiosResponse } from 'axios'
import { UA } from '@/config'

/**
 * axios 封装，可满足大部分情况下的需求，若无法满足则重新封装 axios。
 * 返回值中一定包括 status ，通过状态码判断是否响应成功，可自行选择抛出 Error 或处理掉 Error
 * @author CaoMeiYouRen
 * @date 2020-05-26
 * @export
 * @param {string} url
 * @param {*} [query={}] 查询字符串
 * @param {*} [data={}] 提交的body部分
 * @param {*} [method='GET'] 请求方法
 * @param {*} [headers={}] 请求头
 * @returns
 */
export async function ajax(url: string, query: any = {}, data: any = {}, method: any = 'GET', headers: any = {}): Promise<AxiosResponse<any>> {
    try {
        headers = Object.assign({ 'User-Agent': UA, Referer: url }, headers)
        const result = await axios(url, {
            method,
            headers,
            params: query,
            data,
            timeout: 10000,
        })
        return result
    } catch (error) {
        let e: any = {}

        if (error.toJSON) {
            e = error.toJSON()
        } else {
            e = error
        }

        e.status = error?.response?.status || 500
        e.data = error?.response?.data

        console.log(e)

        return e
    }
}

// async function start() {
//     // const result = await ajax('https://api.cmyr.ltd/robot/v2.0/test/123456?status=500&token=123456')
//     // const result = await ajax('https://www.google.com.hk')
//     const result = await ajax('http://127.0.0.1/test')
//     console.log(result.status)
//     console.log(result.data)
//     console.log(result.headers)
// }
// setTimeout(() => {
//     start()
// }, 2000)