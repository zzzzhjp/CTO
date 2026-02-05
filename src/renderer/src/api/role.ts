import http from "@utils/request";

interface Irole {
    current: number
    size: number
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

export interface IRoleTree{
    id: string;
    name: string;
    parentId: string;
    sort: number;
    path: string;
    query: null;
    component: string;
    cache: number;
    type: number;
    visible: number;
    redirect: string;
    enabled: number;
    perms: string;
    icon: string;
    remark: null;
    createBy: null;
    createTime: null;
    updateBy: null;
    updateTime: null;
    children?:IRoleTree[]
}

interface IRoleMenu {
    code: string
    msg: string
    data: {
      records: IRoleTree[];
      total: number;
      size: number;
      current: number;
      orders: any[];
      optimizeCountSql: boolean;
      searchCount: boolean;
      countId: null;
      maxLimit: null;
      pages: number;
    };
}

export const rolePage = (data:Irole):Promise<IRoleApiResponse> =>{
    return http.get<IRoleApiResponse>('/system/role/page',data)
}

export const roleTree = ( data:{
    current:string;
    size:string;
    enabled:string;
}):Promise<IRoleMenu>=>{
	return http.get<IRoleMenu>('/system/menu/page',data);
}


interface IRoleAdd {
    id?:string | undefined;
    roleName: string;
    rolePerm: string;
    enabled: string;
    descript: string | undefined;
    permissionIds: string[];
}

interface IRoleAddData {
    code: string;
    msg: string;
    data: null;
}

//添加角色
export const roleAdd = ( data:IRoleAdd ):Promise<IRoleAddData>=>{
	return http.post<IRoleAddData>('/system/role/add', data )
}

interface IRoleDel{
    code:string;
    msg:string;
    data:null;
}

//删除角色
export const roleDelete = ( data:string ):Promise<IRoleDel>=>{
	return http.get<IRoleDel>(`/system/role/delete/${data}`)
}

interface IRoleUpate{
    role:{
        id:string
        roleName:string;
        rolePerm:string;
        unitId:string;
        dataPrivileges:string;
        enabled:string;
        createBy:null;
        createTime:number;
        updateBy:null;
        updateTime: null,
        descript: string | null;
    },
    permissions:string[];
}
interface IUpate{
    msg:string;
    code:string;
    data:IRoleUpate;
}
//角色详情
export const roleDetail = ( data:string ):Promise<IUpate>=>{
	return http.get<IUpate>(`/system/role/get/${data}`)
}



//修改角色
export const roleUpdate = ( data:IRoleAdd ):Promise<IRoleDel>=>{
	return http.post<IRoleDel>('/system/role/update', data )
}