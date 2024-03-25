/*
 * @Description:
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-02-02 01:23:38
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-02 01:25:23
 */
import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		/**
		 * 路由名称
		 */
		title: string
		/**
		 * 是否启用路由
		 */
		enabled?: boolean
		/**
		 * 是否是侧边栏
		 */
		aside?: boolean
		/**
		 * 是否是导航
		 */
		navigate?: boolean
		/**
		 * 用于排序
		 */
		order?: number
		/**
		 * 是否是布局
		 */
		isLayout?: boolean
		/**
		 * 布局
		 */
		layout?: string | boolean
		/**
		 * 权限标识
		 */
		roles?: string[]
	}
}
