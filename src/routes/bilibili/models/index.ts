export * from './article'
export * from './bili_user'
export * from './live'
export * from './media_bangumi'
export * from './photo'
export * from './topic'
export * from './video'

export class CostTime {
    params_check: string
    illegal_handler: string
    as_response_format: string
    as_request: string
    save_cache: string
    deserialize_response: string
    as_request_format: string
    total: string
    main_handler: string
}

export class ExpList {
    5510: boolean
    6699: boolean
}

export class BilibiliData {
    seid: string
    page: number
    pagesize: number
    numResults: number
    numPages: number
    suggest_keyword: string
    rqt_type: string
    cost_time: CostTime
    exp_list: ExpList
    egg_hit: number
    result: any
    show_column: number
}

export class BilibiliResult {
    code: number
    message: string
    ttl: number
    data: BilibiliData
}