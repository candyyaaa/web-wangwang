/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-23 18:19:59
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-09-05 00:03:49
 */
import store from '@/store'
import { useRequest } from 'alova'
import { getUserInfoData } from '@/api/user'

export const useUserStore = defineStore('user', {
	state: (): User.State => {
		return {
			id: '',
			name: 'candy',
			token: 'ffc5e4ae-ffdd-493c-847b-1f960de6dbe6',
			// 权限
			roles: []
		}
	},
	getters: {
		getId(state) {
			return state.id
		}
	},
	actions: {
		reset() {
			// this.setToken('')
			// this.setUserInfo(null)
			// this.setRoles([])
			this.token = ''
			this.roles = []
		},
		setId(id: string) {
			this.id = id
		},
		getUserInfo() {
			return new Promise<boolean>((resolve, reject) => {
				try {
					this.roles = ['1', '11']
					const { data, onSuccess } = useRequest(getUserInfoData, { initialData: {} })
					console.log('data ----------->', data.value)
					onSuccess(event => {
						console.log(' ----------->', event)
					})
					resolve(true)
				} catch (error) {
					console.log('error ----------->', error)
					reject(false)
				}
			})
		},
		/**
		 * @description: 退出登录 清空token等信息
		 * @return {Promise} Promise操作 清空信息
		 */
		logout(): Promise<string> {
			return new Promise<string>(resolve => {
				this.reset()
				resolve('')
			})
		}
	}
})

/**
 * @description: 在 setup 外使用
 */
export const useUserStoreHook = () => useUserStore(store)
