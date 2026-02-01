<template>
    <div>
        <div v-if="nextMenu.length <= 0">
            <p>暂无二级菜单</p>
        </div>
        <template 
            v-for="navItem in nextMenu"
            :key="navItem.id"
        >
            <el-menu-item :index="navItem.path">
                <el-icon>
                    <component :is="navItem.meta?.icon.replace('el-icon-','')"></component>
                </el-icon>
                <template #title>
                    <span>{{ navItem.name }}</span>
                </template>
            </el-menu-item>
        </template>
    </div>
</template>

<script setup lang="ts">
import { PropType} from 'vue'
import { Parent } from '@interface/user'

defineProps({
    nextMenu:{
        type: Object as PropType<Parent[]>,
        required: true,
        default: ()=>[]
    }
})

</script>

<style scoped>

</style>