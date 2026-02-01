<template>
    <div class="login-container">
        <div class="login" @mousedown="mousedown">
            <!-- 按钮 -->
             <div class="login-config">
                <div class="login-config-btn">
                    <!-- 换肤 -->
                    <el-button circle @click="configDark">
                        <el-icon v-if="dark =='dark'"><Sunny /></el-icon>
                        <el-icon v-else><Moon /></el-icon>
                    </el-button>
                    <!-- close-btn -->
                    <el-button icon="close" circle type="default" @click="closeWindow"></el-button>
                </div>
             </div>
            <!-- leftSide -->
            <div class="login-adv">
                <div class="login-adv-title">
                    <h2>小鹿线</h2>
                    <h4>后台管理系统</h4>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis, beatae?</p>
                </div>

                <div class="login-adv-mask"></div>

                <div class="login-adv-img">
                    <img src="@assets/images/data.png" width="100%">
                </div>
            </div>

            <!-- rightSide -->
             <div class="login-main">
                <div class="login-form">
                    <div class="login-hearder">
                        <div class="login-img">
                            <img src="@assets/images/logo.png" alt="">
                            <label for="">后台管理系统</label>
                        </div>
                    </div>

                    <el-tabs>
                        <el-tab-pane label="账号登陆" lazy>
                            <PasswordForm />
                        </el-tab-pane>
                        <el-tab-pane label="手机登陆" lazy>
                            <PhoneForm />
                        </el-tab-pane>
                    </el-tabs>

                    <template v-if="true">
                        <el-divider>其他登陆方式</el-divider>
                        <div class="login-oauth">
                            <el-button type="success" circle size="large">
                                <el-icon size="large">
                                    <ChatDotRound />
                                </el-icon>
                            </el-button>
                        </div>
                    </template>
                </div>
             </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MoonNight, Sunny } from '@element-plus/icons-vue';
import PasswordForm from './component/PasswordForm.vue';
import PhoneForm from './component/PhoneForm.vue';

import { ref } from 'vue';

let isKeyDown = ref<boolean>(false);
let dinatesX = ref<number>(0);
let dinatesY = ref<number>(0);

// const mousedown = (event) => {
//     isKeyDown.value = true;
//     // 修正：使用clientX/clientY（窗口内坐标）而不是screenX/screenY
//     dinatesX.value = event.clientX;
//     dinatesY.value = event.clientY;

//     document.onmousemove = (ev) => {
//         if (isKeyDown.value) {
//             // 修正：使用clientX/clientY
//             const x = ev.clientX - dinatesX.value;
//             const y = ev.clientY - dinatesY.value;
            
//             // 给主进程传入偏移量（不是绝对坐标）
//             let data = {
//                 offsetX: x,
//                 offsetY: y
//             }
//             electron.ipcRenderer.invoke('window-drag', data);
//         }
//     };
    
//     document.onmouseup = () => {
//         isKeyDown.value = false;
//         document.onmousemove = null; // 清理事件监听器
//     };
// }

const closeWindow = ():void =>{
    electron.ipcRenderer.invoke('close-login')
}

const dark = ref<string | null>(localStorage.getItem('dark'))

const configDark = ():void => {
    const element = document.querySelector('html') as HTMLElement | null
    if(element){
        if(element.className === 'dark'){
            element.className = ''
        }else{
            element.className = 'dark'
        }
        dark.value = element.className
        localStorage.setItem('dark',element.className)
    }
}

</script>

<style scoped>
    .login{
        height: 100dvh;
        width: 100dvw;
        background: #fff;
        display: flex;
        position: relative;
    }

    .login-config{
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
        width: 100%;
    }

    .login-config-btn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 120px;
        margin: 10px 10px 0 0;
        float: right;
    }

    .login-adv{
        background: url('@assets/images/auth_banner.jpg') no-repeat;
        width: 40%;
        position: relative;
        user-select: none;
    }

    .login-adv-title{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        padding: 40px;
        color: #fff;
    }

    .login-adv-title h2{
        font-size: 40px;
    }

    .login-adv-title h4{
        font-size: 18px;
        margin-top: 10px;
    }

    .login-adv-title p{
        font-size: 14px;
        margin-top: 10px;
        line-height: 1.8;
        color: rgba(255, 255, 255, .6);
    }

    .login-adv-img{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 80px;
        padding: 40px;
        z-index: 3;
    }

    .login-adv-mask{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 1;
    }

    .login-main{
        flex: 1;
        overflow: auto;
        display: flex;
    }

    .login-form{
        margin: auto;
        width: 400px;
        padding: 80px 0 0 0;
    }

    .login-hearder{
        margin-bottom: 40px;
    }

    .login-hearder .login-img{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-hearder .login-img img{
        width: 40px;
        height: 40px;
        vertical-align: bottom;
        margin-right: 10px;
    }

    .login-hearder .login-img label{
        font-size: 26px;
        font-weight: bold;
        color: #333;
    }

    .login-oauth{
        display: flex;
        justify-content: space-around;
    }
</style>