/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-26 17:58:26
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-26 18:15:03
 */

export const useSettingsStore = defineStore({
	// 唯一id
	id: 'settings',
	state: () => {
		return {
			home: {
				title: '头部头部',
				enable: false
			}
		}
	},
	getters: {},
	actions: {}
})
