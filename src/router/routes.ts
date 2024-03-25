/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-03 02:52:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-27 23:32:31
 */
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'
console.log(' ----------->', generatedRoutes)

// 常驻路由
const constantList = generatedRoutes.filter(v => v.meta?.constant)

/**
 * 带 layout 的常驻路由
 */
export const constantRoutes = constantList.map(v => (!v.meta?.layout ? v : setupLayouts([v])[0]))

/**
 * 动态路由
 */
export const asyncRoutes = setupLayouts(
	generatedRoutes.filter(v => !v.meta?.constant && v.meta?.layout)
)

/**
 * 动态菜单
 */
export const asyncMenus = generatedRoutes.filter(v => !v.meta?.constant && v.meta?.layout)
