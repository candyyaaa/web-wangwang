/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-23 18:19:59
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-04 18:01:42
 */
export const useUserStore = defineStore('user', {
	state: (): User.State => {
		return {
			id: '',
			name: 'candy',
			token: 'ffc5e4ae-ffdd-493c-847b-1f960de6dbe6'
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
