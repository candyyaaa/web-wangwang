/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-03 02:52:17
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-06 16:09:45
 */
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'

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
