/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-23 18:19:59
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-23 18:27:33
 */
import type { UserInfo } from './type'

export const useUserStore = defineStore('user', {
	state: (): UserInfo => {
		return {
			id: '',
			name: ''
		}
	},
	getters: {
		getId(state) {
			return state.id
		}
	},
	actions: {
		setId(id: string) {
			this.id = id
		}
	}
})
