/*
 * @Description: <工具函数集合>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-04 17:49:12
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-02 01:38:37
 */
import { resolve } from 'path-browserify'

import type { RouteRecordRaw } from 'vue-router'

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
export const hasPermission = (roles: string[], value: RouteRecordRaw): boolean => {
	if (!value.meta?.roles) {
		return false
	}

	return roles.some(role => value.meta?.roles?.includes(role))
}
