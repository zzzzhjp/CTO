<template>
    <div class="pagination">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[20, 50, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)

const props = withDefaults(defineProps<{
    currentPage: number
    pageSize: number
    total: number
}>(),{
    currentPage: 1,
    pageSize: 10,
    total: 10
})

const emits = defineEmits<{
    (event:'update:currentPage',payload:number):void
    (event:'update:pageSize',payload:number):void
}>()
const handleSizeChange = (page:number)=>{
    pageSize.value = page
    emits('update:pageSize',page)
}

const handleCurrentChange = (page:number)=>{
    currentPage.value = page
    emits('update:currentPage',page)
}
</script>

<style scoped>

</style>