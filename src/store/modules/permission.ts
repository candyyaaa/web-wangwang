/*
 * @Description: 权限状态
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-02-01 02:57:01
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 01:12:59
 */

import { clone } from 'radash'
import { constantRoutes, asyncRoutes } from '@/router/routes'
import { hasPermission } from '@/utils'

import type { RouteRecordRaw } from 'vue-router'

/**
 * 根据权限递归过滤路由
 * @param {RouteRecordRaw} routes - 路由数组
 * @param {string[]} roles - 权限数组
 * @return {RouteRecordRaw[]} 返回拥有权限路由数组
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
	const arr: RouteRecordRaw[] = []
	routes.forEach(route => {
		if (hasPermission(roles, route)) {
			const tmpRoute = clone(route)
			if (tmpRoute.children) {
				tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles)
				tmpRoute.children.length && arr.push(tmpRoute)
			} else {
				arr.push(tmpRoute)
			}
		}
	})
	return arr
}

/**
 * 根据 ranking 对权限路由数组树进行排序
 * @param {RouteRecordRaw} tree
 * @returns {RouteRecordRaw[]} 返回权限路由数组
 */
const sortTreeByRanking = (tree: RouteRecordRaw[]): RouteRecordRaw[] => {
	// 首先，对当前层级的节点进行排序
	tree.sort((a, b) => ((a.meta?.ranking as number) ?? 0) - ((b.meta?.ranking as number) ?? 0))

	// 然后，递归对子节点进行排序
	for (const node of tree) {
		if (node.children && node.children.length > 0) {
			node.children = sortTreeByRanking(node.children)
		}
	}

	return tree
}

export const usePermissionStore = defineStore('permission', () => {
	// 检查用户是否已获得其权限角色
	const ingenerate = ref<boolean>(false)
	// 可访问路由: 常驻路由 + 有访问权限的动态路由
	const routes = ref<RouteRecordRaw[]>([])
	// 侧边菜单: 有访问权限的动态路由
	const menus = ref<RouteRecordRaw[]>([])
	// 菜单默认选中
	const menusDefaultActive = ref<string>('/')
	// 有访问权限的路由
	const accessRoutes = ref<RouteRecordRaw[]>([])
	// 当前删除路由
	const currentRemoveRoutes = ref<(() => void)[]>([])
	// 需要缓存的路由
	const keepAliveComponents = ref<string[]>([])

	// 获取排序后的菜单
	const getSortedMenus = computed<RouteRecordRaw[]>(() => {
		const tmpMenus = clone(menus.value)

		return sortTreeByRanking(tmpMenus)
	})

	/**
	 * 根据权限数组动态生成路由
	 * @param {string[]} roles - 权限数组
	 */
	const generateRoutes = (roles: string[]): void => {
		// 动态权限路由
		const permissionRoutes = filterAsyncRoutes(asyncRoutes, roles)
		const permissionMenus = filterAsyncRoutes(asyncRoutes, roles)
		// 可访问路由
		routes.value = constantRoutes.concat(permissionRoutes)
		// 有权限路由
		accessRoutes.value = permissionRoutes
		// 菜单
		menus.value = permissionMenus

		ingenerate.value = true
	}
	/**
	 * 记录 accessRoutes 路由，用于登出时删除路由
	 * @param {function[]} routes - 数组
	 */
	const setCurrentRemoveRoutes = (routes: (() => void)[]) => {
		currentRemoveRoutes.value = routes
	}
	/**
	 * 设置需要缓存的组件
	 * @param {string[]} compNames - 组件名列表
	 */
	const setKeepAliveComponents = (compNames: string[]) => {
		keepAliveComponents.value = compNames
	}
	/**
	 * 清空动态路由
	 */
	const removeRoutes = () => {
		ingenerate.value = false
		routes.value = []
		accessRoutes.value = []
		menus.value = []
		currentRemoveRoutes.value.forEach(removeRoute => {
			removeRoute()
		})
		currentRemoveRoutes.value = []
	}

	return {
		ingenerate,
		routes,
		menus,
		menusDefaultActive,
		accessRoutes,
		currentRemoveRoutes,
		keepAliveComponents,
		getSortedMenus,
		generateRoutes,
		setCurrentRemoveRoutes,
		setKeepAliveComponents,
		removeRoutes
	}
})
