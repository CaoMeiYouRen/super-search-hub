import axios from 'axios'

export async function ajax(url: string, query: any = {}, data: any = {}, method: any = 'GET', headers = {}) {
    try {
        const result = await axios(url, {
            method,
            headers,
            params: query,
            data,
            timeout: 5000,
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

        return error
    }
}

async function start() {
    // const result = await ajax('https://api.cmyr.ltd/robot/v2.0/test/123456?status=500&token=123456')
    const result = await ajax('https://www.google.com.hk')

    // console.log(result)
}
start()