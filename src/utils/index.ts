/*
 * @Description: <工具函数集合>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-04 17:49:12
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 02:08:19
 */
import { resolve } from 'path-browserify'
import { clone } from 'radash'

import type { RouteRecordRaw } from 'vue-router/auto'

/**
 * @description: 转化路由路径
 * @param {string} basePath
 * @param {string} routePath
 * @return {string} path
 */
export function resolveRoutePath(basePath: string, routePath?: string): string {
	return basePath ? resolve(basePath, routePath ?? '') : routePath ?? ''
}

/**
 * 根据传入的权限标识列表，判断当前路由是否有权限
 * @param {string[]} roles - 权限标识列表
 * @param {RouteRecordRaw} value - 路由信息
 * @returns {boolean} 返回 true 表示有权限，返回 false 表示无权限
 */
export const hasPermission = (roles: string[], route: RouteRecordRaw): boolean => {
	if (!route.meta?.roles) {
		return false
	}

	return roles.some(role => route.meta?.roles?.includes(role))
}

/**
 * 根据角色权限标识过滤路由
 * @param {RouteRecordRaw} routes - 路由数组
 * @param {string} roles - 用户角色标识数组
 * @returns {RouteRecordRaw[]} 返回过滤之后的路由数组
 */
export const filterRoutesByRole = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
	return routes.reduce((filteredRoutes: RouteRecordRaw[], route: RouteRecordRaw) => {
		if (hasPermission(roles, route)) {
			const tmpRoute = clone(route)
			if (tmpRoute.children) {
				tmpRoute.children = filterRoutesByRole(tmpRoute.children, roles)
				if (tmpRoute.children.length) {
					filteredRoutes.push(tmpRoute)
				}
			} else {
				filteredRoutes.push(tmpRoute)
			}
		}
		return filteredRoutes
	}, [])
}

/**
 * 根据 sort 对权限路由数组树进行排序
 * @param {RouteRecordRaw} routes - 需要排序的路由数组
 * @returns {RouteRecordRaw[]} 返回权限路由数组
 */
export const sortRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
	// 首先，对当前层级的节点进行排序
	routes.sort((a, b) => (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0))

	// 然后，递归对子节点进行排序
	for (const route of routes) {
		if (route.children && route.children.length > 0) {
			route.children = sortRoutes(route.children)
		}
	}

	return routes
}
