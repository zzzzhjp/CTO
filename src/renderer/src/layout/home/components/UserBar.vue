<template>
    <div class="userBar-container">
        <div class="user-bar">
            <el-dropdown class="panel-item">
                <div class="user-avatar">
                    <el-avatar :size="30" :src="userInfo.avatar"></el-avatar>
                    <el-icon style="margin-left: 5px;"><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="outLogin()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <div class="panel-item">
                <el-icon><ChatDotRound></ChatDotRound></el-icon>
            </div>

            <div class="panel-item">
                <el-icon><Download /></el-icon>
            </div>

            <div class="panel-item" @click="minimizeWindow">
                <el-icon><Minus /></el-icon>
            </div>

            <div class="panel-item" @click="maxmizeWindow">
                <el-icon><FullScreen /></el-icon>
            </div>

            <div class="panel-item" @click="closeApp">
                <el-icon><Close /></el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@store/useUerStore';
import { storeToRefs } from 'pinia';
import { ElMessage ,ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';


const router = useRouter()
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const outLogin = ()=>{
    ElMessageBox.confirm('确认','是否退出登录',{
        type: 'warning',
        confirmButtonText: '退出'
    }).then(()=>{
        ElMessage({
            type:'info',
            message:'成功退出'
        })
        window.electron.ipcRenderer.invoke('out-login')

        router.replace({
            path: '/login'
        })

        localStorage.setItem('TOKEN','')

    }).catch(()=>{
        ElMessage({
            type:'info',
            message:'取消退出'
        })
    })
}

const closeApp = ()=>{
     ElMessageBox.confirm('确认','是否关闭',{
        type: 'warning',
        confirmButtonText: '退出'
    }).then(()=>{
        window.electron.ipcRenderer.invoke('app-close')
    }).catch(()=>{
        ElMessage({
            type: 'info',
            message: '取消关闭'
        })
    })
}

const minimizeWindow = ()=>{
    window.electron.ipcRenderer.invoke('minimize-window')
}

const maxmizeWindow = ()=>{
    window.electron.ipcRenderer.invoke('maxmize-window')
}

</script>

<style scoped lang="scss">
.userBar-container {
    height: 100%;
}
.user-bar{
    display: flex;
    align-items: center;
    height: 100%;

    .panel-item {
        display: flex;
        padding: 0 10px;
        align-items: center;
        height: 100%;
        cursor: pointer;

        .user-avatar {
            display: flex;
            align-items: center;
            // margin-right: 2px;
        }
        &:hover {
            background: rgba($color: #000000, $alpha: 0.1);
        }
    }
}
</style>