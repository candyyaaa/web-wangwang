/*
 * @Description: <main>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-07 17:48:16
 */
import { createApp } from 'vue'

// 路由
import router from './router'
// 状态管理
import store from './store'
// 跟组件
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

// 挂载路由
app.use(router)
// 挂载状态管理
app.use(store)
app.mount('#app')
