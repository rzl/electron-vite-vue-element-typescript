import { request } from "../utils";
import { BaseRequest } from "./BaseRequest";

export class TablesRequest extends BaseRequest{
    getUserInfo() {
        return request.get('/user/userInfo')
    }
    getPermissions() {
        return request.get('/user/permissions')
    }
}

export const tablesRequest = new TablesRequest('/tables')