/*
 * @Description: <权限状态>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-03 02:25:02
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-14 15:10:00
 */
import store from '@/store'
import cloneDeep from 'lodash-es/cloneDeep'
// import { Message } from 'element-plus'
import { constantRoutes, asyncRoutes, asyncMenus } from '@/router/routes'
import { storage } from '@/utils/storage'
import type { RouteRecordRaw } from 'vue-router'

/**
 * @description: 判断是否有权限
 * @param {string[]} roles - 权限数组
 * @param {RouteRecordRaw} route - 路由信息
 * @return {boolean} 返回路由是否拥有权限
 */
const hasPermission = (roles: string[], route: RouteRecordRaw): boolean => {
	if (!route.meta?.roles) {
		return false
	}

	return roles.some(role => (route.meta?.roles as string[]).includes(role))
}

/**
 * @description: 根据权限递归过滤路由
 * @param {RouteRecordRaw} routes - 路由数组
 * @param {string[]} roles - 权限数组
 * @return {RouteRecordRaw[]} 返回拥有权限路由数组
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
	const arr: RouteRecordRaw[] = []
	routes.forEach(route => {
		if (hasPermission(roles, route)) {
			const tmpRoute = cloneDeep(route)
			if (tmpRoute.children) {
				tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles)
				tmpRoute.children.length && arr.push(tmpRoute)
			} else {
				arr.push(tmpRoute)
			}
		}
	})
	return arr
}

const sortTreeByRanking = (tree: RouteRecordRaw[]): RouteRecordRaw[] => {
	// 首先，对当前层级的节点进行排序
	tree.sort((a, b) => ((a.meta?.ranking as number) ?? 0) - ((b.meta?.ranking as number) ?? 0))

	// 然后，递归对子节点进行排序
	for (const node of tree) {
		if (node.children && node.children.length > 0) {
			node.children = sortTreeByRanking(node.children)
		}
	}

	return tree
}

export const usePermissionStore = defineStore({
	// 状态唯一id
	id: 'permission',
	state: (): Permission.State<RouteRecordRaw> => {
		return {
			ingenerate: false,
			routes: [],
			menus: [],
			menusDefaultActive: '/',
			accessRoutes: [],
			currentRemoveRoutes: [],
			keepAliveComponents: [],
			tabList: storage.getCache<RouteRecordRaw[]>('tag_tabList', false)
		}
	},
	getters: {
		/**
		 * 获取所有菜单
		 * @returns {RouteRecordRaw[]} 返回有权访问的菜单
		 */
		getMenus(): RouteRecordRaw[] {
			const tmpMenus = cloneDeep(this.menus)

			return toRaw(sortTreeByRanking(tmpMenus))
		},

		/**
		 * 获取标签栏列表数据
		 * @returns {RouteRecordRaw[]} 返回 sessionStorage 存储的有权访问的标签栏
		 */
		getTabs(): RouteRecordRaw[] {
			const tmpMenus = cloneDeep(this.tabList)

			return toRaw(tmpMenus)
		}
	},
	actions: {
		/**
		 * @description: 根据权限数组动态生成路由
		 * @param {string[]} roles - 权限数组
		 */
		generateRoutes(roles: string[]): void {
			// 动态权限路由
			const permissionRoutes = filterAsyncRoutes(asyncRoutes, roles)
			const permissionMenus = filterAsyncRoutes(asyncMenus, roles)
			// 可访问路由
			this.routes = constantRoutes.concat(permissionRoutes)
			// 有权限路由
			this.accessRoutes = permissionRoutes
			// 菜单
			this.menus = permissionMenus

			// 标签数据
			storage.setCache(
				'tag_tabList',
				permissionMenus.filter(v => v.path === this.menusDefaultActive),
				false
			)
			this.ingenerate = true
		},
		/**
		 * @description: 记录 accessRoutes 路由，用于登出时删除路由
		 * @param {function[]} routes - 数组
		 */
		setCurrentRemoveRoutes(routes: (() => void)[]) {
			this.currentRemoveRoutes = routes
		},
		/**
		 * 设置需要缓存的组件
		 * @param {string[]} compNames - 组件名列表
		 */
		setKeepAliveComponents(compNames: string[]) {
			this.keepAliveComponents = compNames
		},
		/**
		 * 清空动态路由
		 */
		removeRoutes() {
			this.ingenerate = false
			this.routes = []
			this.accessRoutes = []
			this.menus = []
			this.currentRemoveRoutes.forEach(removeRoute => {
				removeRoute()
			})
			this.currentRemoveRoutes = []
		}
	}
})

/**
 * @description: 在 setup 外使用
 */
export const usePermissionStoreHook = () => usePermissionStore(store)
