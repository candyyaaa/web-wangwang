/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-03 02:52:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-03 03:17:02
 */
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'
import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = generatedRoutes.filter(v => v.meta?.constant)

export const asyncRoutes: RouteRecordRaw[] = setupLayouts(
	generatedRoutes.filter(v => !v.meta?.constant && !v.meta?.Layout)
)
