/*
 * @Description: 使用 TS 进行 Vue-Router 的 Meta 类型扩展
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-04-22 21:24:24
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-03 01:04:24
 */

import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		// affix?: boolean
		// constant: boolean
		// hidden: boolean
		// icon?: string
		// keepAlive?: boolean
		// layout: string | boolean
		// roles: string[]
		// sort: number
		// title: string
		/**
		 * 是否粘住固定导航栏标签
		 */
		affix?: boolean
		/**
		 * 是否常驻路由
		 */
		constant: boolean
		/**
		 * 是否在侧边菜单隐藏菜单
		 */
		hidden?: boolean
		/**
		 * 菜单图标
		 */
		icon?: string
		/**
		 * 是否开启页面缓存
		 */
		keepAlive?: boolean
		/**
		 * 页面布局
		 */
		layout: string | boolean
		/**
		 * 用户角色权限标识
		 */
		roles?: string[]
		/**
		 * 侧边栏中的排序
		 */
		sort?: number
		/**
		 * 路由页面标题
		 */
		title: string
	}
}
