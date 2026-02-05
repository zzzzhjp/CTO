<template>
    <div style="height: 100%;">
        <el-container>
            <el-main>
                <el-tabs type="border-card">
                    <el-tab-pane label="角色列表">
                        <el-card class="card-container">
                            <el-form :model="roleForm">
                                <el-row :gutter="15">
                                    <el-col :span="8">
                                        <el-form-item label="角色名称">
                                            <el-input placeholder="请输入角色名称" v-model="roleForm.roleName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="角色编码">
                                            <el-input placeholder="请输入角色编码" v-model="roleForm.rolePerm"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="9">
                                        <el-form-item label="状态">
                                            <el-select placeholder="请选择启用状态" v-model="roleForm.enabled">
                                                <el-option
                                                    v-for="item in dicts.system_global_status"
                                                    :key="item.id"
                                                    :label="item.k"
                                                    :value="item.v"
                                                ></el-option>
                                                
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item>
                                            <el-button icon="search" type="primary" @click="getRolePage">搜索</el-button>
                                            <el-button icon="refreshLeft" @click="resetPage">重置</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-card>
                        <el-card>
                            <div class="toolbar">
                                <el-button icon="plus" type="primary" @click="handleDialogChange">新增</el-button>
                            </div>
                            <el-table :data="tableData" border>
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
                                <el-table-column prop="rolePerm" label="权限字符" align="center"></el-table-column>
                                <el-table-column  label="是否启用" align="center">
                                    <template #default="{row}">
                                        <el-tag v-if="row.enabled == 1" type="primary">{{ row.enabled == '1' ? '启用' : '禁用' }}</el-tag>
                                        <el-tag v-else type="danger">{{ row.enabled == '1' ? '启用' : '禁用' }}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="创建时间" align="center" :formatter="formatter"></el-table-column>
                                <el-table-column label="操作" align="center" width="220" fixed="right">
                                    <!-- <template #defualt="{ row }"> -->
                                        <div class="sys-table-main-actions">
                                            <el-link icon="edit" type="primary" underline="never">编辑</el-link>
                                            <el-link icon="delete" type="danger" underline="never" style="margin: 0 8px;">删除</el-link>
                                            <router-link class="el-link el-link--error" type="success" to="/">分配用户</router-link>
                                        </div>
                                    <!-- </template> -->
                                </el-table-column>
                            </el-table>
                            <pagination
                                :total="totals"
                                @update:current-page="handleCurrentPageChange"
                                @update:page-size="handlePageSizeChange"
                            ></pagination>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="回收站">2</el-tab-pane>
                </el-tabs>
            </el-main>
            <role-dialog
                v-if="dialogVisible"
                v-model:dialogVisible="dialogVisible"
                :roleUpdateId="roleUpdateId"
            ></role-dialog>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { rolePage, Role } from '@api/role'
import { ref, onBeforeMount } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import roleDialog from './roleDialog.vue'

import tool from '@utils/tool'
import { useDictsService } from '@plugins/useDicts'
const { dicts, getDicts} = useDictsService()

const tableData = ref<Role[]>([])
const totals = ref(0)


const roleForm = ref({
        current: 1,
        size: 10,
        roleName: '',
        rolePerm: '',
        enabled: '',
    })

onBeforeMount(()=>{
    getRolePage()
})

const getRolePage = async ()=>{
    let res = await rolePage(roleForm.value)

    let { records , total} = res.data

    totals.value = total
    tableData.value = records
}

const resetPage = ()=>{
    roleForm.value = {
        current: 1,
        size: 10,
        roleName: '',
        rolePerm: '',
        enabled: '',
    }
    getRolePage()
}

getDicts(['system_global_status','system_global_gender'])

const formatter = (_: Role , __: TableColumnCtx<Role>,timeValue: number)=> {
    return tool.dateFormat( timeValue )
}

const handleCurrentPageChange =( page: number)=>{
    roleForm.value.current = page
    getRolePage()
}

const handlePageSizeChange = ( page:number )=>{
    roleForm.value.size = page
    getRolePage()
}

const dialogVisible = ref<boolean>(false)
const roleUpdateId = ref<string>('') // Add this line to define roleUpdateId

const handleDialogChange = ()=>{
    dialogVisible.value = true
    roleUpdateId.value = '' // Set to empty or a specific id as needed
}
</script>

<style lang="scss" scoped>
.card-container{
    margin-bottom: 15px;
}

.toolbar{
    margin-bottom: 15px;
}

.pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}
</style>