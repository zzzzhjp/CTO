interface DictsItem{
    id:string;
    typeId:string;
    k:string;
    v:string;
    sort:number;
    remark:string;
    createBy:string;
    createTime:number;
    updateBy:string | null;
    updateTime:number | null;
}

export interface IDictsData {
    system_global_status:DictsItem[]
}

export interface IDicts {
    code: string
    msg: string
    data: IDictsData
}