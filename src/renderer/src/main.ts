// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import '@assets/css/style.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import useDicts from '@plugins/useDicts'

import 'element-plus/theme-chalk/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

//国际化
import i18n from '@locales/index'

//全局组件
import pagination from '@components/Pagination/index.vue'
app.component('pagination',pagination)

//全局指令
import { AuthDirectives } from '@directives/auths.directives'


app
    .directive(AuthDirectives.name, AuthDirectives)
    .use(pinia)
    .use(router)
    .use(ElementPlus)
    .use(useDicts)
    .use(i18n)
    .mount('#app')
