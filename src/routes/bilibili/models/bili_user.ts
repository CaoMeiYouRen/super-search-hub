/* Cost_time*/
export class Cost_time {
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

/* Exp_list*/
export class Exp_list {
}

/* Res*/
export class Res {
    aid: number
    bvid: string
    title: string
    pubdate: number
    arcurl: string
    pic: string
    play: string
    dm: number
    coin: number
    fav: number
    desc: string
    duration: string
    is_pay: number
    is_union_video: number
}

/* Official_verify*/
export class Official_verify {
    type: number
    desc: string
}

/* Result*/
export class BiliUserResult {
    type: string
    mid: number
    uname: string
    usign: string
    fans: number
    videos: number
    upic: string
    verify_info: string
    level: number
    gender: number
    is_upuser: number
    is_live: number
    room_id: number
    res: Res[]
    official_verify: Official_verify
    hit_columns: string[]
}