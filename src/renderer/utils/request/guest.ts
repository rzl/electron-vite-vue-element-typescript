import { I_userInfo } from "@/store/modules/user";
import { request } from "../utils";
import { responseData } from '../request'

export interface I_login_res extends responseData {
    result: I_userInfo
}

export interface I_guest {
    login():Promise<I_login_res>
}

export function login(loginInfo: any):Promise<I_login_res> {
    return request.post('/guest/login', loginInfo)
}