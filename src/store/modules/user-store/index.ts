/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-23 18:19:59
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-11 17:16:35
 */
import store from '@/store'
import { ElMessage as message } from 'element-plus'
import { useRequest } from 'alova'
import { cloneDeep } from 'lodash-es'
import { login, getUserInfoData } from '@/api/user'
import { storage } from '@/utils/storage'
import type { LoginParams, LoginResult, UserInfoResult } from '@/api/user/type'
import type { ResultData } from '@/api'

export const useUserStore = defineStore('user', {
	state: (): User.State => {
		return {
			id: '',
			name: 'candy',
			token: storage.getCache('token'),
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
			this.setToken('')
			// this.setUserInfo(null)
			this.setRoles([])
		},
		setId(id: string) {
			this.id = id
		},
		/**
		 * @description: 设置token
		 * @param {string} token - 登录成功token
		 */
		setToken(token: string): void {
			this.token = token
			storage.setCache('token', token)
		},
		/**
		 * @description: 设置角色权限
		 * @param {string} roles - 用户信息角色权限
		 */
		setRoles(roles: string[]): void {
			this.roles = roles
		},
		/**
		 * @description: 登录
		 * @param {object} params - 账号密码 account; password
		 * @return {Promise<LoginResult>} 登录接口返回
		 */
		login(params: LoginParams): Promise<LoginResult> {
			return new Promise<LoginResult>((resolve, reject) => {
				try {
					const { data, onSuccess, onError } = useRequest(login(params), { initialData: {} })

					// 请求成功
					onSuccess(() => {
						if (data.value.code === 200) {
							// 赋值token
							this.setToken(data.value.data.token)
							resolve(data.value.data)
						} else {
							message.warning(data.value.message)
							resolve(data.value.data)
						}
					})

					// 请求错误
					onError(() => {
						message.warning('登陆失败，请稍后重试！')
						reject()
					})
				} catch (error) {
					console.log('error ----------->', error)
					reject()
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
		},
		/**
		 * @description: 请求获取用户信息
		 * @return {Promise} 返回 Promise 操作
		 */
		getUserInfo(): Promise<ResultData<UserInfoResult>> {
			return new Promise<ResultData<UserInfoResult>>((resolve, reject) => {
				try {
					this.roles = ['1', '11']
					const { onSuccess, onError } = useRequest(getUserInfoData, { initialData: {} })

					// 请求成功
					onSuccess(event => {
						if (event.data.code === 200) {
							this.setRoles(cloneDeep(event.data.data.roles))

							resolve({ ...event.data })
						} else {
							message.warning(event.data.message)
							resolve({ ...event.data })
						}
					})

					// 请求错误
					onError(() => {
						reject()
					})
				} catch (error) {
					console.log('error ----------->', error)
					reject(false)
				}
			})
		}
	}
})

/**
 * @description: 在 setup 外使用
 */
export const useUserStoreHook = () => useUserStore(store)
