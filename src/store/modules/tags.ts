/*
 * @Description: 标签状态
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-02-24 22:41:13
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-26 21:55:12
 */
import cloneDeep from 'lodash-es/cloneDeep'

import type { RouteLocationNormalized } from 'vue-router'

export const useTagsStore = defineStore('tags', () => {
	const list = ref<RouteLocationNormalized[]>([])
	const leaveIndex = ref<number>(-1)

	/**
	 * 添加标签
	 * @param {RouteLocationNormalized} route - 传递路由
	 * @returns {Promise<void>}
	 */
	const add = async (route: RouteLocationNormalized): Promise<void> => {
		const names: string[] = []

		route.matched.forEach((item, index) => {
			if (index > 0) {
				item.components?.default.name && names.push(item.components.default.name)
			}
		})

		if (route.name !== 'reload') {
			const findTag = list.value.find(item => item.name === route.name)

			if (!findTag) {
				if (leaveIndex.value >= 0) {
					list.value.splice(leaveIndex.value + 1, 0, cloneDeep(route))
				} else {
					list.value.push(cloneDeep(route))
				}
			}
		}
	}

	/**
	 * 删除指定标签
	 * @param {string} routeName - 路由名称
	 * @returns {void}
	 */
	const removeSpecified = (routeName: string): void => {
		list.value = list.value.filter(item => item.name !== routeName)
	}

	/**
	 * 删除左侧标签
	 * @param {string} routeName - 路由名称
	 * @returns {void}
	 */
	const removeLeftSide = (routeName: string): void => {
		const index = list.value.findIndex(item => item.name === routeName)
		list.value = list.value.filter((_, i) => i >= index)
	}

	/**
	 * 删除右侧标签
	 * @param {string} routeName - 路由名称
	 * @returns {void}
	 */
	const removeRightSide = (routeName: string): void => {
		const index = list.value.findIndex(item => item.name === routeName)
		list.value = list.value.filter((_, i) => i <= index)
	}

	/**
	 * 删除两侧标签
	 * @param {string} routeName - 路由名称
	 * @returns {void}
	 */
	const removeOtherSide = (routeName: string): void => {
		list.value = list.value.filter(item => item.name === routeName)
	}

	const clearTag = (): void => {
		list.value
	}

	return {
		list,
		add,
		removeSpecified,
		removeLeftSide,
		removeRightSide,
		removeOtherSide,
		clearTag
	}
})
