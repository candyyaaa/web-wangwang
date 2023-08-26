/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-23 18:19:59
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-08-26 21:18:15
 */
import type { UserInfo } from './type'

export const useUserStore = defineStore('user', {
	state: (): UserInfo => {
		return {
			id: '',
			name: 'candy'
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
