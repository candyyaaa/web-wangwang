/*
 * @Description: 菜单状态
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-05-03 01:17:35
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 02:14:09
 */

import { clone } from 'radash'
import { filterRoutesByRole, sortRoutes } from '@/utils'

import type { RouteRecordRaw } from 'vue-router/auto'

export const useMenuStore = defineStore('menu', () => {
	const list = ref<RouteRecordRaw[]>([])

	// 获取排序之后的菜单数据
	const getSortedMenus = computed<RouteRecordRaw[]>(() => {
		list.value = filterRoutesByRole(appStore.useRouteStore.list, appStore.useUserStore.roles)

		return sortRoutes(clone(list.value))
	})

	return {
		list,
		getSortedMenus
	}
})
