/*
 * @Description: vue-router 配置
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:18:33
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 02:32:20
 */
import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { asyncRoutes } from './routes'
// 进度条插件
import { start, done } from '@/utils/nprogress'

// 白名单路由路径
const whiteList = ['/login', '/redirect', '/:all(.*)*']

const router = createRouter({
	history: createWebHistory('/'),
	extendRoutes: routes => {
		console.log(setupLayouts(routes.filter(item => item.meta?.constant)))
		return setupLayouts(routes.filter(item => item.meta?.constant))
	}
})

// 路由切换之前触发
router.beforeEach(async (to, _, next) => {
	start()

	// 用户信息状态
	const { token } = storeToRefs(appStore.useUserStore)
	const { getUserInfo } = appStore.useUserStore
	// 权限状态
	const { ingenerate, list } = storeToRefs(appStore.useRouteStore)
	const { generateRoutes, setRemoveRoutes } = appStore.useRouteStore

	if (token.value) {
		// 是否已根据权限动态生成并注册路由
		if (ingenerate.value) {
			if (to.name === 'Login') {
				next({ name: 'Index', replace: true })
			} else {
				next()
			}
		} else {
			// 动态生成路由
			//! 请求获取用户信息
			await getUserInfo()

			generateRoutes(asyncRoutes)
			const removeRoutes: (() => void)[] = []

			list.value.forEach(r => {
				if (!/^(https?:|mailto|tel:)/.test(r.path)) {
					removeRoutes.push(router.addRoute(setupLayouts([r])[0]))
				}
			})

			setRemoveRoutes(removeRoutes)

			//* 动态路由生成并注册后，重新进入当前路由
			next({
				path: to.path,
				query: to.query,
				replace: true
			})
		}
	} else {
		// 如果没有 token
		if (whiteList.includes(to.path)) {
			// 如果在免登录的白名单中，则直接进入
			next()
		} else {
			// 其他没有访问权限的页面将被重定向到登录页面
			next(`/login?redirect=${to.path}`)
		}
	}
})

// 路由切换完成后触发
router.afterEach((to, _, failure) => {
	done()
	useTitle(to.meta?.title as string)
	const { keepAliveComponents: keepAliveComponentsState } = storeToRefs(appStore.usePermissionStore)
	const { setKeepAliveComponents } = appStore.usePermissionStore

	if (isNavigationFailure(failure)) {
		console.log('failed navigation ----------->', failure)
	}

	// 需要缓存的组件
	const keepAliveComponents = keepAliveComponentsState.value
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
	setKeepAliveComponents(keepAliveComponents)

	// if (to.name) {
	// 	tagsViewStore.addTab(to)
	// 	permissionStore.menusDefaultActive = to.path
	// }

	// 滚动到最上面
	document.documentElement.scrollTop = 0
})

// meta
/*
	title: string; 页面标题，通常必选。
	icon?: string; 图标，一般配合菜单使用。
	auth?: boolean; 是否需要登录权限。
	ignoreAuth?: boolean; 是否忽略权限。
	roles?: RoleEnum[]; 可以访问的角色
	keepAlive?: boolean; 是否开启页面缓存
	hideMenu?: boolean; 有些路由我们并不想在菜单中显示，比如某些编辑页面。
	order?: number; 菜单排序。
	frameUrl?: string; 嵌套外链。
*/

export default router
