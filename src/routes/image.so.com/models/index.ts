/* ImageItem */
export class ImageItem {
    id: string
    qqface_down_url: boolean
    downurl: boolean
    downurl_true: string
    grpmd5: boolean
    type: number
    src: string
    color: number
    index: number
    title: string
    litetitle: string
    width: string
    height: string
    imgsize: string
    imgtype: string
    key: string
    dspurl: string
    link: string
    source: number
    img: string
    thumb_bak: string
    thumb: string
    _thumb_bak: string
    _thumb: string
    imgkey: string
    thumbWidth: number
    dsptime: string
    thumbHeight: number
    grpcnt: string
    fixedSize: boolean
    fnum: string
    comm_purl: string
}
  
/* ImageSoResult */
export class ImageSoResult {
    total: number
    end: boolean
    sid: string
    ran: number
    ras: number
    kn: number
    cn: number
    gn: number
    ps: number
    pc: number
    adstar: number
    lastindex: number
    ceg: boolean
    list: ImageItem[]
    boxresult: any
    wordguess: any
    prevsn: number
}