import { defineStore } from 'pinia'
import { useUserStore } from './useUerStore'
import { useMenuStore } from './useMenuStore'
import { useTagStore } from './useTagStore'

export const useStore = defineStore('storeId',{
  state: () => {
    return{
      user: useUserStore(),
      menu: useMenuStore(),
      tag: useTagStore(),
    }
  },
  getters:{},
  actions:{}
})