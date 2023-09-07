/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:18:33
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 15:36:09
 */
import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'
import cloneDeep from 'lodash-es/cloneDeep'
import { constantRoutes } from './routes'
import { useUserStoreHook } from '@/store/modules/user-store'
import { usePermissionStoreHook } from '@/store/modules/permission-store'
// 进度条插件
import { start, done } from '@/utils/nprogress'

// 白名单路由路径
const whiteList = ['/login', '/redirect', '/:all(.*)*']

// 用户信息状态
const userStore = useUserStoreHook()
// 权限状态
const permissionStore = usePermissionStoreHook()

const router = createRouter({
	history: createWebHistory('/'),
	routes: constantRoutes
})

// 路由切换之前触发
router.beforeEach(async (to, _, next) => {
	start()

	if (userStore.token) {
		// 是否已根据权限动态生成并注册路由
		if (permissionStore.ingenerate) {
			if (to.name === 'Login') {
				next({ name: 'Index', replace: true })
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
		}
	}
})

// 路由切换完成后触发
router.afterEach((to, _, failure) => {
	done()
	useTitle(to.meta?.title as string)

	if (isNavigationFailure(failure)) {
		console.log('failed navigation ----------->', failure)
	}

	const keepAliveComponents = permissionStore.keepAliveComponents
	// 当前组件名称
	const currentComName = to.matched.find(v => v.name === to.name)?.name

	if (
		currentComName &&
		!keepAliveComponents.includes(currentComName as string) &&
		to.meta?.keepAlive
	) {
		// 需要缓存的组件
		keepAliveComponents.push(currentComName as string)
	} else if (!to.meta?.keepAlive || to.name === 'Redirect') {
		// 不需要缓存的组件
		const index = keepAliveComponents.findIndex(name => name === currentComName)
		if (index !== -1) {
			keepAliveComponents.splice(index, 1)
		}
	}

	// 存入store
	permissionStore.setKeepAliveComponents(keepAliveComponents)

	// 滚动到最上面
	document.documentElement.scrollTop = 0
})

export default router
