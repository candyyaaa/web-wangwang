/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:18:33
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-06 00:50:42
 */
import { createRouter, createWebHistory } from 'vue-router'
import cloneDeep from 'lodash-es/cloneDeep'
import { constantRoutes } from './routes'
import { useUserStoreHook } from '@/store/modules/user-store'
import { usePermissionStoreHook } from '@/store/modules/permission-store'
// 进度条插件
import { start, done } from '@/utils/nprogress'

// 白名单
const whiteList = ['/login']

const router = createRouter({
	history: createWebHistory('/'),
	routes: constantRoutes
})

// 路由切换之前触发
router.beforeEach(async (to, _, next) => {
	start()
	// 用户信息状态
	const userStore = useUserStoreHook()
	// 权限状态
	const permissionStore = usePermissionStoreHook()

	if (userStore.token) {
		// 是否已根据权限动态生成并注册路由
		if (permissionStore.ingenerate) {
			// console.log(' 1----------->', router)
			// console.log(' 2----------->', to)
			// console.log(' 3----------->', to.name === 'login')
			if (to.name === 'login') {
				next({ name: 'index', replace: true })
			} else {
				next()
			}
		} else {
			// 动态生成路由
			try {
				//! 请求获取用户信息
				const result = await userStore.getUserInfo()

				if (result.code === 200) {
					permissionStore.generateRoutes(cloneDeep(userStore.roles))
					const removeRoutes: (() => void)[] = []

					permissionStore.accessRoutes.forEach(r => {
						if (!/^(https?:|mailto|tel:)/.test(r.path)) {
							removeRoutes.push(router.addRoute(r))
						}
					})

					permissionStore.setCurrentRemoveRoutes(removeRoutes)

					// console.log('router 1----------->', router)
					// router
					// 	.isReady()
					// 	.then(() => {
					// 		console.log('router 2----------->', router)
					// 	})
					// 	.catch(err => {
					// 		console.log('router.isReady err ----------->', err)
					// 	})
					//* 动态路由生成并注册后，重新进入当前路由
					next({
						path: to.path,
						query: to.query,
						replace: true
					})
				}
			} catch (error) {
				console.log('error ----------->', error)
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
