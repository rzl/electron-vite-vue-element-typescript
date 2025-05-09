import { request } from "../request";
import { BaseRequest } from "./BaseRequest";

export class UserRequest extends BaseRequest{
    getUserInfo() {
        return request.get('/user/userInfo')
    }
    getPermissions() {
        return request.get('/user/permissions')
    }
}

export const userRequest = new UserRequest('/user')