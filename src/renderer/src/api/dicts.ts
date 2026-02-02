import http from "@utils/request";
import { IDicts } from "@interface/dicts"

export const queryBatch = (data:string[]):Promise<IDicts>=>{
    return http.post<IDicts>('/system/dict/item/queryBatch',data)
}