import axios, { AxiosInstance } from 'axios'
// import store from '@/store'
import { ElMessage, ElMessageBox, ElMessageBoxOptions } from 'element-plus'
import NProgress from 'nprogress'
import storage from './storage'
import { TableColumnsRequest } from './request/tableColumns'
import * as guest from './request/guest'
import { userRequest } from './request/user'
import { tablesRequest } from './request/tables'
import { tableColumnsRequest } from './request/tableColumns'
export interface responseData {
    statusCode: number,
    message: string,
    result: any
}
export interface I_key {
    tokenHeaderKey: string;
    tenantIdHeaderKey: string;
}

export const key = {
    tokenHeaderKey: 'token',
    tenantIdHeaderKey: 'tenant'
}

export const service = axios.create({
    baseURL: window.BASE_API_URL,
    timeout: 60000
})

service.interceptors.request.use((config = {}) => {
    if (!config) return config
    if (!config.headers) return config
    NProgress.start()
    if (!config) return config
    const token = storage.getToken()
    if (token) {
        config.headers[key.tokenHeaderKey] = token
    }
    let tenant_id = storage.getTenantId()
    if (!tenant_id) {
        tenant_id = 0
    }
    config.headers[key.tenantIdHeaderKey] = tenant_id
    return config
}, (error) => {
    return Promise.reject(error)
})

service.interceptors.response.use(async (response) => {
    NProgress.done()
    let res = response.data as responseData
    if (res.statusCode == 402) {
        let msg: ElMessageBoxOptions = {}
        msg.title = '登录已过期'
        msg.message = '很抱歉，登录已过期，请重新登录'
        msg.confirmButtonText = '重新登录'
        msg.callback = (action, instance) => {
            storage.removeToken()
            try {
                let path = window.document.location.pathname
                console.log("location pathname -> " + path)
                if (path != "/" && path.indexOf('/user/login') == -1) {
                    window.location.reload()
                }
            } catch (e) {
                window.location.reload()
            }
        }
        ElMessageBox.confirm(msg.message, msg)
    }
    if (res.statusCode !== 200) {

        ElMessage.warning({ message: `${res.message}` })
        throw (res)
    }
    if (response.config.responseType === 'blob') {
        return response
    }
    //serviceHook(response)
    return res
}, (error: any) => {
    if (error.response) {
        console.error("网络请求异常", error.response.status, error)
        let errorStr = `url: ${error.config.url} code: ${error.response.status}`
        switch (error.response.status) {
            case 403:
                ElMessage.error({ message: `服务器权限异常 ${errorStr}` })
                break
            case 404:
                ElMessage.error({ message: `资源不存在 ${errorStr}` })
                break
            case 500:
                ElMessage.error({ message: `服务器运行异常 ${errorStr}` })
                break
            case 401:
                let msg: ElMessageBoxOptions = {}
                msg.title = '登录已过期'
                msg.message = '很抱歉，登录已过期，请重新登录'
                msg.confirmButtonText = '重新登录'
                msg.callback = (action, instance) => {
                    storage.removeToken()
                    try {
                        let path = window.document.location.pathname
                        console.log("location pathname -> " + path)
                        window.location.reload()

                    } catch (e) {
                        window.location.reload()
                    }
                }
                ElMessageBox.confirm(msg.message, msg)
                break
            default:
                ElMessage.error({ message: `服务器运行异常 ${errorStr}` })
                break
        }
    }
    return Promise.reject(error)
})
export class Request {
    userRequest = userRequest
    tablesRequest = tablesRequest
    tableColumnsRequest = tableColumnsRequest
    guest = guest
    get(url: string): Promise<responseData>
    get(url: string, ...data: any[]): Promise<responseData>
    get(url: string, params: any): Promise<responseData>
    get(url: string, params: any, config: any): Promise<responseData>
    get(...args: any[]): Promise<any> {
        var [url, params, config] = args
        return service({
            url: url,
            method: 'get',
            params: params,
            ...config
        })
    }

    post(url: string): Promise<responseData>
    post(url: string, ...data: any[]): Promise<responseData>
    post(url: string, data: any): Promise<responseData>
    post(url: string, data: any, params: any): Promise<responseData>
    post(url: string, data: any, params: any, config: any): Promise<responseData>
    post(...args: any[]): Promise<any> {
        var [url, data, params, config] = args
        return service({
            url: url,
            method: 'post',
            data: data,
            params: params,
            ...config
        })
    }

    put(url: string): Promise<responseData>
    put(url: string, ...data: any[]): Promise<responseData>
    put(url: string, data: any): Promise<responseData>
    put(url: string, data: any, params: any): Promise<responseData>
    put(url: string, data: any, params: any, config: any): Promise<responseData>
    put(...args: any[]): Promise<any> {
        var [url, data, params, config] = args
        return service({
            url: url,
            method: 'put',
            data: data,
            params: params,
            ...config
        })
    }

    del(url: string): Promise<responseData>
    del(url: string, ...data: any[]): Promise<responseData>
    del(url: string, data: any): Promise<responseData>
    del(url: string, data: any, params: any): Promise<responseData>
    del(url: string, data: any, params: any, config: any): Promise<responseData>
    del(...args: any[]): Promise<any> {
        var [url, data, params, config] = args
        return service({
            url: url,
            method: 'del',
            data: data,
            params: params,
            ...config
        })
    }

    http(method: string, url: string): Promise<responseData>
    http(method: string, url: string, ...data: any[]): Promise<responseData>
    http(method: string, url: string, data: any): Promise<responseData>
    http(method: string, url: string, data: any, params: any): Promise<responseData>
    http(method: string, url: string, data: any, params: any, config: any): Promise<responseData>
    http(...args: any[]): Promise<any> {
        var [method, url, data, params, config] = args
        return service({
            url,
            method,
            data,
            params,
            ...config
        })
    }
}
export const request = new Request()
export default request
