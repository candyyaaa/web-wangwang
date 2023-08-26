/*
 * @Description: <main>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-08-26 21:50:10
 */
import { createApp } from 'vue'

// 路由
import router from './router'
// 状态管理
import store from './store'
// 跟组件
import App from './App.vue'
// 国际化
import { initLang } from './i18n'

// tailwind 初始化css
import '@unocss/reset/tailwind.css'
// 全局css
import './styles/main.css'
import './styles/ep.css'
// uno 原子化
import 'virtual:uno.css'
// svg 图标
import 'virtual:svg-icons-register'
// ep 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
// 挂载国际化
initLang(app)
// 挂载路由
app.use(router)
// 挂载状态管理
app.use(store)
app.mount('#app')
