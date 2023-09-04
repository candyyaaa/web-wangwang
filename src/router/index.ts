/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:18:33
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-09-04 23:02:41
 */
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
// import generatedRoutes from '~pages'
import cloneDeep from 'lodash-es/cloneDeep'
import { constantRoutes, asyncRoutes } from './routes'
import { useUserStoreHook } from '@/store/modules/user-store'
import { usePermissionStoreHook } from '@/store/modules/permission-store'
console.log('constantRoutes ----------->', constantRoutes, asyncRoutes)
// 进度条插件
import { start, done } from '@/utils/nprogress'

// 白名单
const whiteList = ['/login']

// 用户信息状态
const userStore = useUserStoreHook()
// 权限状态
const permissionStore = usePermissionStoreHook()

// 路由数组
export const routes = constantRoutes.map(generatedRoute =>
	generatedRoute.name === 'index' ? setupLayouts([generatedRoute])[0] : generatedRoute
)

const router = createRouter({
	history: createWebHistory('/'),
	routes: constantRoutes
})

// 路由切换之前触发
router.beforeEach(async (to, _, next) => {
	start()
	// next()

	if (userStore.token) {
		if (to.path === '/login') {
			next({ path: '/' })
			done()
		} else {
			// 是否已根据权限动态生成并注册路由
			if (permissionStore.ingenerate) {
				// 正常加载页面
				next()
			} else {
				//! 请求获取用户信息
				await userStore.getUserInfo()
				// 请求返回角色权限信息
				const roles = cloneDeep(userStore.roles)

				// 根据角色权限信息动态生成可访问的路由信息 routers
				permissionStore.generateRoutes(roles)
				// 更新路由列表
				permissionStore.accessRoutes.forEach(r => {
					router.addRoute(r)
				})

				//* 动态路由生成并注册后，重新进入当前路由
				next({
					path: to.path,
					query: to.query,
					replace: true
				})
			}
		}
	} else {
		// 如果没有 token
		if (whiteList.includes(to.path)) {
			// 如果在免登录的白名单中，则直接进入
			next()
		} else {
			// 其他没有访问权限的页面将被重定向到登录页面
			next('/login')
			done()
		}
	}
})

// 路由切换完成后触发
router.afterEach(() => {
	done()
})

export default router
