import { request } from "../utils";
import { BaseRequest } from "./BaseRequest";

export class TableColumnsRequest extends BaseRequest{

}

export const tableColumnsRequest = new TableColumnsRequest('/tableColumns')