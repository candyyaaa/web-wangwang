/*
 * @Description: <pinia状态 类型>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-04 16:05:29
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-01-31 21:16:00
 */

/* 用户状态 */
declare namespace User {
	interface State {
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
		 * 菜单默认选中
		 * @默认值 `/` - 路由路径
		 */
		menusDefaultActive: string
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

// 页签栏状态
declare namespace TagsView {
	export interface State<T> {
		/**
		 * 页签 tab栏数据 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
		 * @默认值 `[]`
		 */
		tabList: T[]
	}
}
