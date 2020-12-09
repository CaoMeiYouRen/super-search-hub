/* eslint-disable max-params */
import axios, { AxiosResponse } from 'axios'
import iconv from 'iconv-lite'
import queryString = require('query-string')
import { CACHE, UA } from '@/config'
import { HttpError, HttpStatusCode } from '@/models'
import { getCharset } from './stringHelper'
import { globalCache } from '@/middleware'
import { md5 } from './encrypt'
import { Log } from './helper'

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
export async function ajax(url: string, query: any = {}, data: any = {}, method: any = 'GET', headers: any = {}, charset?: string): Promise<AxiosResponse<any>> {
    try {
        headers = Object.assign({ 'User-Agent': UA, Referer: url }, headers)
        const result = await axios(url, {
            method,
            headers,
            params: query,
            data,
            timeout: 10000,
            responseType: 'arraybuffer',
            transformResponse(_data: any, _headers?: any) {
                if (!_data) {
                    return _data
                }
                const _charset = charset || getCharset(_data?.toString()) || 'UTF-8'
                _data = iconv.decode(_data, _charset)
                try {
                    _data = JSON.parse(_data)
                } catch (error) {

                }
                return _data
            }
        })
        if (!result.data) {
            throw new HttpError(406, '源站访问失败！')
        }
        return result
    } catch (error) {
        if (error instanceof HttpError) {
            throw error
        }
        if (error.toJSON) {
            Log.error(error.toJSON())
        }
        // if (!(e instanceof HttpError)) {
        //     e.status = error?.response?.status || HttpStatusCode.INTERNAL_SERVER_ERROR
        //     e.data = error?.response?.data
        // }
        throw error // 将错误向上抛出
    }
}
class AjaxConfig {
    query?: any = {}
    data?: any = {}
    method?: any = 'GET'
    headers?: any = {}
    charset?: string
}

/**
 * 同 ajax 封装。只是多了个缓存参数。会直接返回data内容
 */
export async function cacheAjax(url: string, config: AjaxConfig = {}, maxAge = CACHE.CACHE_AGE * 1000): Promise<any> {
    const hash = `cache-ajax-${md5(url + queryString.stringify(config.query))}`
    const value = await globalCache.get(hash)
    if (value) {
        return value
    }
    const result = await ajax(url, config.query, config.data, config.method, config.headers, config.charset)
    if (result.data) {
        await globalCache.set(hash, result.data, maxAge)
    }
    return result.data
}

/**
 * 获取本机外网IP
 *
 * @author CaoMeiYouRen
 * @date 2019-07-24
 * @export
 * @returns {Promise<string>}
 */
export async function getPublicIP(): Promise<string> {
    try {
        const res = await axios.get('https://ipv4.icanhazip.com/')
        let ip: string = res.data
        ip = ip.replace(/\n/g, '')
        return ip
    } catch (error) {
        console.log(error)
        return ''
    }
}