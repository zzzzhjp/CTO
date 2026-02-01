import http from "@utils/request";
import { IUserData,IMenuData } from '@interface/user'


export const getInfo = ():Promise<IUserData> => {
    return http.get<IUserData>('/personal/getInfo')
}

export const getUserMenu = (data:string):Promise<IMenuData> => {
    return http.get<IMenuData>(`/personal/getRouters/${data}`)
}