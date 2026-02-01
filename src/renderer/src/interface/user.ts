export interface user {
    id: string;
    username: string;
    realName: string;
    userType: number;
    email: string;
    phone: string;
    gender: number;
    avatar: string;
    enabled: number;
    delFlag: number;
    remake:string | null
}

export interface Permission {
    [index:number]: string
}

export interface Unit {
    id: string;
    name: string;
    code: string;
    codeseq: string;
    contact: string;
    mobile: string;
    email: string;
    web:string;
    parentId: string;
    hasChildren: number;
    system: number;
    enable: number;
    leaderId: string | null;
    createBy: string
    createTime: number | null
    updataBy: string | null
    updataTime: number | null
    address: string
}

export interface Role {
    id: string
    roleName: string
    rolePerm: string
}

export interface IUserData {
    code: string
    msg: string
    data: {
        userInfo: user
        permissions: Permission
        units: Unit
        roles: Role[]
    }
}

//关于路由
export interface Meta {
    title: string;
    icon: string;
    noCache: boolean;
    link: string | null;
  }
  
export interface Child {
    id: string;
    name: string;
    path: string;
    hidden: boolean;
    component: string;
    meta: Meta;
  }
  
export interface Parent {
    id?: string;
    name?: string;
    hidden?: boolean;
    redirect?: string;
    component?: string;
    alwaysShow?: boolean;
    query?: string;
    path?: string;
    meta?: Meta;
    children?: Child[];
  }
  
export interface IMenuData {
    code: string;
    msg: string;
    data: Parent[];
}

export interface IUserInfo {
    id: string;
    username: string
    realName: string
    userType: number
    email: string
    phone: string
    gender: number
    avatar: string
    enabled: number
    delFlag: number
    remak: string | null
}