<template>
    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="500"
        @close="close"
    >
        <template #default>
            <el-form :model="roleForm">
                <el-form-item label="角色名称">
                    <el-input v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>

                <el-form-item label="权限字符">
                    <el-input v-model="roleForm.rolePerm" placeholder="请输入权限字符"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-radio-group v-model="roleForm.enabled">
                        <el-radio 
                            v-for="item in dicts.system_global_status" 
                            :key="item.id"
                            :label="roleForm.enabled == item.v ? roleForm.enabled : item.v"
                        >{{ item.k }}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="菜单权限">
                    <div class="menu-item">
                        <el-checkbox    
                            v-model="permission.openAll"
                            @change="toggleTreeCollapse"
                        >展开/折叠</el-checkbox>

                        <el-checkbox
                            v-model="permission.selectAll"
                            @change="toggleTreeChecked"
                        >全选/全不选</el-checkbox>

                        <el-checkbox
                            v-model="permission.linkage"
                        >父子(联动/不联动)</el-checkbox>

                        <el-tree
                            ref="menuTreeRef"
                            :data="permission.treeList"
                            :props="permission.treeProps"
                            :check-strictly="!permission.linkage"
                            :default-expand-all="permission.openAll"
                            show-checkbox
                            node-key="id"
                        ></el-tree>
                    </div>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input
                        :data="permission.treeList"
                        :props="permission.treeProps"
                        :check-strictly="!permission.linkage"
                        :default-expand-all="permission.openAll"
                        show-checkbox
                        node-key="id"
                        class="tree"
                    ></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="onSubmit">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { roleTree , IRoleTree ,roleAdd , roleDetail , roleUpdate  } from '@api/role'
import { ElTree } from 'element-plus';
import normalizeMenuList from './normalizeMenulist';

import { useDictsService } from '@plugins/useDicts'
const { dicts, getDicts} = useDictsService()
getDicts(['system_global_status','system_global_gender'])

const props = withDefaults(
    defineProps<{
        dialogVisible: boolean
        roleUpdateId: string
    }>(),
    {
        dialogVisible: false,
        roleUpdateId: ''
    }
)

const dialogVisible = ref( props.dialogVisible )
const roleUpdateId = ref( props.roleUpdateId );

const emits = defineEmits<{
    (event:'update:dialogVisible',paylod: boolean): void
    (event:'roleChange'):void
}>()


const roleForm:{
    id?:string | undefined;
    roleName:string;
    rolePerm:string;
    enabled:string;
    descript:string | undefined;
} = reactive({
    "roleName": "",//角色名称
    "rolePerm": "",//角色权限编码
    "enabled": '1',//是否启用（0：禁用；1：启用）
    "descript": '',//描述
})

interface IPermission{
    treeList:IRoleTree[];
    treeProps:{
        label:string;
    };
    linkage:boolean;
    openAll:boolean;
    selectAll:boolean;
}

//菜单树
let permission:IPermission = reactive({
    treeList:[],
    treeProps:{
        label:'name'
    },
    linkage:true,
    openAll:false,
    selectAll:false
})

const close = ()=>{
    emits('update:dialogVisible',false)
}

const menuTreeRef = ref<InstanceType<typeof ElTree>>()

const toggleTreeCollapse = (e:boolean)=>{
    let nodeMap = menuTreeRef.value!.store.nodesMap;
    Object.keys(  nodeMap ).forEach(key=>{
        nodeMap[key].expanded = e;
    })
}

const toggleTreeChecked = ( e:boolean )=>{
    let nodeMap = menuTreeRef.value!.store.nodesMap;
    Object.keys(  nodeMap ).forEach(key=>{
        nodeMap[key].checked = e;
    })
}

const addRole = ()=>{
    roleAdd({
        permissionIds:menuTreeRef.value!.getCheckedKeys() as string[],
        ...roleForm
    })
}

//修改
const updateRole = ()=>{
    roleUpdate({
        permissionIds:menuTreeRef.value!.getCheckedKeys() as string[],
        ...roleForm
    })
}

//确认
const onSubmit = async ()=>{
    if( roleUpdateId.value !='' ){
        await updateRole();
    }else{
        await addRole();
    }
    emits('roleChange');
    close();
}

onBeforeMount(async ()=>{
    let menuData = await roleTree({
        current:'1',
        size:'999',
        enabled:'1'
    })

    const { records } = menuData.data
    permission.treeList = normalizeMenuList(records)
    
    if( roleUpdateId.value !='' ){
        let updateData = await roleDetail( roleUpdateId.value );
        let data = updateData.data;
        let { roleName  , rolePerm , enabled , descript , id  } = data.role;
        roleForm.id = id;
        roleForm.roleName = roleName;
        roleForm.rolePerm = rolePerm;
        roleForm.enabled = enabled;
        roleForm.descript = descript?.toString();
        menuTreeRef.value?.setCheckedKeys( data.permissions );
    }
})

</script>

<style scoped>
.tree{
    border: 1px solid #ccc;
}
</style>