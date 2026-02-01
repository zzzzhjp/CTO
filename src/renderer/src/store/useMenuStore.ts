import { defineStore } from "pinia";
import { getUserMenu } from "@api/user";
import { useUserStore } from "./useUerStore";
import { Parent } from "@interface/user";

export const useMenuStore = defineStore('menuId',{
    state: ():{
        menu: Parent[]
    } => {
        return {
            menu:[]
        }
    },
    getters:{},
    actions:{
        async getMenu(){
            let res = await getUserMenu(useUserStore().rolePerm)
            this.menu = res.data
            console.log(res.data);
        }
    },
    persist: {
        pick: ['menu']
    }
})