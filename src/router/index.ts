/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:18:33
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-04 18:10:47
 */
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'
import { constantRoutes, asyncRoutes } from './routes'
import { usePermissionStore } from '@/store/modules/permission-store'
console.log('constantRoutes ----------->', constantRoutes, asyncRoutes)
// console.log('generatedRoutes ----------->', generatedRoutes)

// 进度条插件
import { start, done } from '@/utils/nprogress'

// 路由数组
export const routes = constantRoutes.map(generatedRoute =>
	generatedRoute.name === 'index' ? setupLayouts([generatedRoute])[0] : generatedRoute
)

const router = createRouter({
	history: createWebHistory('/'),
	routes: routes
})

// 路由切换之前触发
router.beforeEach((to, from, next) => {
	// console.log(' ----------->', to, next)
	start()
	/* 根据用户信息角色权限信息生成可访问的路由信息 routers  */
	// usePermissionStore().generateRoutes(['1', '11'])
	// usePermissionStore().accessRoutes.forEach(r => {
	// 	router.addRoute(r)
	// })
	next()
})

// 路由切换完成后触发
router.afterEach(() => {
	done()
})

export default router
