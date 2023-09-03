/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:18:33
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-03 03:10:10
 */
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'
import { constantRoutes, asyncRoutes } from './routes'
console.log('constantRoutes ----------->', constantRoutes, asyncRoutes)
console.log('generatedRoutes ----------->', generatedRoutes)

// 进度条插件
import { start, done } from '@/utils/nprogress'

// 路由数组
export const routes = generatedRoutes.map(generatedRoute =>
	generatedRoute?.meta?.layout ? setupLayouts([generatedRoute])[0] : generatedRoute
)

const router = createRouter({
	history: createWebHistory('/'),
	routes
})

// 路由切换之前触发
router.beforeEach((pre, next) => {
	console.log(' ----------->', pre, next)
	start()
})

// 路由切换完成后触发
router.afterEach(() => {
	done()
})

export default router
