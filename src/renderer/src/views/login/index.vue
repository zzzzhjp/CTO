<template>
    <div class="login-container">
        <div class="login">
            <!-- 按钮 -->
             <div class="login-config">
                <div class="login-config-btn">
                    <!-- 国际化 -->
                     <el-dropdown trigger="click" @command="configLang">
                        <el-button circle>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362L368 281.65L401.17 362z" fill="currentColor"></path><path d="M267.84 342.92a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z" fill="currentColor"></path></svg>
                        </el-button>
                        <template #dropdown >
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="item in config.LANG"
                                    :key="item.value"
                                    :command="item"
                                >{{  item.name }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
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
                    <h2> {{  $t('login.name')  }}</h2>
                <h4>{{  $t('login.slogan')  }}</h4>
                <p>{{  $t('login.describe')  }}</p>
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

import { reactive, ref , getCurrentInstance , ComponentInternalInstance} from 'vue';

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// let isKeyDown = ref<boolean>(false);
// let dinatesX = ref<number>(0);
// let dinatesY = ref<number>(0);

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

const config = reactive({
    LANG: [
        { name:'中文', value:'zh-cn'},
        { name:'英文', value:'en'}
    ]
})

const configLang = (item: {
    name: string
    value: string
})=>{
    let $i18n = proxy?.$i18n
    $i18n!.locale = item.value

    localStorage.setItem('lang',item.value)
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

    .el-button+.el-button {
        margin-left: 0;
    }
</style>