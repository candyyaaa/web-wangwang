/*
 * @Description: <权限状态>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-03 02:25:02
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-04 17:01:58
 */
import cloneDeep from 'lodash-es/cloneDeep'
// import { Message } from 'element-plus'
import { constantRoutes, asyncRoutes } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'

/**
 * @description: 判断是否有权限
 * @param {string[]} roles - 权限数组
 * @param {RouteRecordRaw} route - 路由信息
 * @return {boolean} 返回路由是否拥有权限
 */
const hasPermission = (roles: string[], route: RouteRecordRaw): boolean => {
	if (!route.meta?.roles) {
		return false
	}

	return roles.some(role => (route.meta?.roles as string[]).includes(role))
}

/**
 * @description: 根据权限递归过滤路由
 * @param {RouteRecordRaw} routes - 路由数组
 * @param {string[]} roles - 权限数组
 * @return {RouteRecordRaw[]} 返回拥有权限路由数组
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
	const arr: RouteRecordRaw[] = []
	routes.forEach(route => {
		if (hasPermission(roles, route)) {
			const tmpRoute = cloneDeep(route)
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

export const usePermissionStore = defineStore({
	// 状态唯一id
	id: 'permission',
	state: (): Permission.State<RouteRecordRaw> => {
		return {
			routes: [],
			accessRoutes: []
		}
	},
	getters: {},
	actions: {
		/**
		 * @description: 根据权限数组生成路由
		 * @param {string[]} roles - 权限数组
		 */
		generateRoutes(roles: string[]): void {
			// 动态权限路由
			const permissionRoutes = filterAsyncRoutes(asyncRoutes, roles)
			// 可访问路由
			this.routes = constantRoutes.concat(permissionRoutes)
			// 有权限路由
			this.accessRoutes = permissionRoutes
		}
	}
})
