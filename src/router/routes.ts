/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-03 02:52:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 01:09:12
 */
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

// 常驻路由
const constantList = routes.filter(r => r.meta?.constant)

/**
 * 带 layout 的常驻路由
 */
export const constantRoutes = constantList.map(v => (!v.meta?.layout ? v : setupLayouts([v])[0]))

/**
 * 动态路由
 */
export const asyncRoutes = routes.filter(
	r => !r.meta?.constant && r.meta?.layout && !r.meta?.hidden
)
