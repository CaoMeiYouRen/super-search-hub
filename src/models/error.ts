/**
 * 自定义HttpError
 *
 * @author CaoMeiYouRen
 * @date 2020-05-25
 * @export
 * @class HttpError
 * @extends {Error}
 */
export class HttpError extends Error {
    statusCode: number
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}