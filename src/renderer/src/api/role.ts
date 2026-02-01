import http from "@utils/request";

interface Irole {
    current: string
    size: string
    roleName?: string
    rolePerm?: string
    enabled?: string
}

export interface Role {
    id: string
    roleName: string
    rolePerm: string
    unitId: string
    dataPrivileges: number
    enabled: number
    createBy: string | null
    createTime: number | null
    updateBy: string | null
    updateTime: number | null
    descript: string | null
}

interface IRoleApiResponse {
    code: string
    msg: string
    data: {
        records: Role[]
        total: number
        size: number
        orders: any[]
        current: number
        optimizeCountSql: boolean
        searchCount: boolean
        countId: string | null
        maxLimit: number | null
        pages: number
    }
}

export const rolePage = (data:Irole):Promise<IRoleApiResponse> =>{
    return http.get<IRoleApiResponse>('/system/role/page',data)
}