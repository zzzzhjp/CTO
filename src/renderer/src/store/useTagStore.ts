import { defineStore } from "pinia"
import { ITagRoute } from "@interface/tag"

export const useTagStore = defineStore('tagId',{
    state:():{
        viewTags:ITagRoute[]
    }=>{
        return {
            viewTags:[]
        }
    },
    getters:{},
    actions:{
        pushViewTags( route:ITagRoute ){
            let target = this.viewTags.find(item => item.path == route.path ) as ITagRoute
            if( !target ){
                this.viewTags.push( route)
            }
        },
        removeViewTags( route:ITagRoute){
            this.viewTags.forEach((item:ITagRoute,index)=>{
                if(item.path == route.path){
                    this.viewTags.splice(index,1)
                }
            })
        }
    },
    persist: {
        pick: ['viewTags']
    }
})