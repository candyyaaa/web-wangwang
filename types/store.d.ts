/*
 * @Description: <pinia状态 类型>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-04 16:05:29
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-06 17:40:14
 */

/* 用户状态 */
declare namespace User {
	export interface State {
		id: string
		name: string
		token: string
		roles: string[]
	}
}

/**
 * 权限状态
 */
declare namespace Permission {
	export interface State<T> {
		/**
		 * @description: 有访问权限的路由
		 * @默认值 `[]`
		 */
		accessRoutes: T[]
		/**
		 * @description: 检查用户是否已获得其权限角色
		 * @默认值 `false`
		 */
		ingenerate: boolean
		/**
		 * @description: 可访问路由: 常驻路由 + 有访问权限的动态路由
		 * @默认值 `[]`
		 */
		routes: T[]
		/**
		 * @description: 侧边菜单: 有访问权限的动态路由
		 * @默认值 `[]`
		 */
		menus: T[]
		/**
		 * @description: 当前删除路由
		 * @默认值 `[]`
		 */
		currentRemoveRoutes: (() => void)[]
		/**
		 * 需要缓存的组件
		 * @默认值 `[]`
		 */
		keepAliveComponents: string[]
	}
}
