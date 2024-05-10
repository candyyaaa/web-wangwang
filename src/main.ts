/*
 * @Description: <main>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-05 23:43:02
 */

// 跟组件
import App from '@/App.vue'

import { createPersistedState } from 'pinia-plugin-persistedstate'
import { registerStore } from '@/store'
// 路由
import router from '@/router'
// 国际化
import { initLang } from '@/i18n'
// 自定义指令
import { setupDirective } from '@/directives'

// tailwind 初始化css
import '@unocss/reset/tailwind-compat.css'
// uno 原子化
import 'virtual:uno.css'
// svg 图标
import 'virtual:svg-icons-register'
// 全局css
import './styles/main.css'
import './styles/ep.css'
// ep 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/ep-dark-css-vars.css'

const app = createApp(App)

// 挂载国际化
initLang(app)
// 挂载自定义指令
setupDirective(app)
// 挂载状态管理
app.use(createPinia().use(createPersistedState()))
// 注册pinia状态管理库
registerStore()
// 挂载路由
app.use(router)
app.mount('#app')
