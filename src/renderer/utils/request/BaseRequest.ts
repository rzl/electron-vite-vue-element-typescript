import { request } from "../utils"

export class BaseRequest {
    url: string = ''
    constructor(url: string) {
        this.url = url
    }
    list(...args: any []) {
        return request.post(this.url +  '/list', ...args)
    }
    add(...args: any []) {
        return request.post(this.url, ...args)
    }
    del(...args: any[]) {
        return request.del(this.url, ...args)
    }
    put(...args: any[]) {
        return request.put(this.url, ...args)
    }
    get(...args: any[]) {
        return request.get(this.url, ...args)
    }
}