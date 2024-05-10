/*
 * @Description: 路由状态
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-05-04 01:10:14
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 02:14:04
 */

import { clone } from 'radash'

import type { RouteRecordRaw } from 'vue-router/auto'

export const useRouteStore = defineStore('route', () => {
	// 检查用户是否已获得其权限角色
	const ingenerate = ref<boolean>(false)

	// 动态路由
	const list = ref<RouteRecordRaw[]>([])

	// 记录删除路由
	const currentRemoveRoutes = ref<(() => void)[]>([])

	/**
	 * 根据角色权限数组生成路由
	 * @param {RouteRecordRaw[]} asyncRoutes - 动态路由
	 * @returns {void}
	 */
	const generateRoutes = (asyncRoutes: RouteRecordRaw[]): void => {
		list.value = clone(asyncRoutes)
		ingenerate.value = true
	}

	/**
	 * 记录 accessRoutes 路由，用于登出时删除路由
	 * @param {Array} routes - 数组
	 * @returns {void}
	 */
	const setRemoveRoutes = (routes: (() => void)[]): void => {
		currentRemoveRoutes.value = routes
	}

	/**
	 * 清空路由状态信息
	 * @returns {void}
	 */
	const clearRoutes = (): void => {
		ingenerate.value = false
		list.value = []
		currentRemoveRoutes.value.forEach(removeRoute => {
			removeRoute()
		})
		currentRemoveRoutes.value = []
	}

	return {
		ingenerate,
		list,
		generateRoutes,
		setRemoveRoutes,
		clearRoutes
	}
})
