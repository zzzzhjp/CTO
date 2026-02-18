import { defineStore } from "pinia";
import { getInfo } from "@api/user";
import { Role , IUserInfo} from "@interface/user";

export const useUserStore = defineStore('userId',{
    state: ():{
        rolePerm:string,
        roles:Role[],
        userInfo: Partial<IUserInfo>,
        permissions: string[]
    } => {
        return {
            roles:[],
            rolePerm:'',
            userInfo:{},
            permissions: [],
        }
    },
    getters:{},
    actions:{
        async getUserInfo(){
            let res = await getInfo()
            let {permissions, roles, units, userInfo } = res.data
            this.roles = roles
            this.rolePerm = roles[0].rolePerm

            this.permissions = permissions

            this.userInfo = userInfo
        }
    },
    persist: {
        pick: ['rolePerm','userInfo']
    }
})