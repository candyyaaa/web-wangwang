/*
 * @Description: 路由权限验证钩子
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-02-02 01:10:38
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-02 01:33:06
 */

import type { RouteRecordRaw } from 'vue-router'

/**
 * 根据传入的权限标识列表，判断当前路由是否有权限
 * @param {string[]} roles - 权限标识列表
 * @param {RouteRecordRaw} value - 路由信息
 * @returns {boolean} 返回 true 表示有权限，返回 false 表示无权限
 */
export const usePermission = (roles: string[], value: RouteRecordRaw): boolean => {
	if (!value.meta?.roles) {
		return false
	}

	return roles.some(role => value.meta?.roles?.includes(role))
}
