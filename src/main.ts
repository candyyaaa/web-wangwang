/*
 * @Description: <main>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-01 01:48:51
 */
import { createApp } from 'vue'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { registerStore } from '@/store'
// 路由
import router from '@/router'
// 跟组件
import App from '@/App.vue'
// 国际化
import { initLang } from '@/i18n'
// 自定义指令
import { setupDirective } from '@/directives'

// tailwind 初始化css
import '@unocss/reset/tailwind.css'
// 全局css
import './styles/main.css'
import './styles/ep.css'
// svg 图标
import 'virtual:svg-icons-register'
// ep 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/ep-dark-css-vars.css'
// ep ElMessage 和 ElLoading 的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
// uno 原子化
import 'virtual:uno.css'

const pinia = createPinia()
// 持久化
pinia.use(createPersistedState())

const app = createApp(App)
// 挂载国际化
initLang(app)
// 挂载自定义指令
setupDirective(app)
// 挂载状态管理
app.use(pinia)
// 注册pinia状态管理库
registerStore()
// 挂载路由
app.use(router)
app.mount('#app')
