/*
 * @Description: 用户信息状态
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-02-01 00:34:10
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 01:36:29
 */
import { useRequest } from 'alova'
import { ElMessage as message } from 'element-plus'
import { clone } from 'radash'
import { login, getUserInfoData } from '@/api/user'
import { storage } from '@/utils/storage'

import type { LoginParams, LoginResult, UserInfoResult } from '@/api/user/type'

console.log(storage.getCache<{ token: string }>('user'))
export const useUserStore = defineStore(
	'user',
	() => {
		// 用户名
		const name = ref<string>('')
		// token
		const token = ref<string>(storage.getCache<{ token: string }>('user')?.token ?? '')
		// 页面权限
		const roles = ref<string[]>([])

		// 获取权限列表 getters
		const getRoles = computed<string[]>(() => roles.value)

		/**
		 * 用户点击登录
		 * @param {LoginParams} param 登录参数
		 * @returns {Promise} 异步操作登录接口返回
		 */
		const handleLogin = (param: LoginParams): Promise<Result<LoginResult>> => {
			const { send, onSuccess, onError } = useRequest(login(param), { initialData: {} })

			onSuccess(event => {
				if (event.data.code === 200) {
					setToken(event.data.data.token)
				} else {
					message.warning(event.data.message)
				}
			})

			onError(event => {
				message.warning('登陆失败，请稍后重试！')
				console.log('event', event)
			})

			return send()
		}

		/**
		 * 退出登录
		 * @returns {Promise} 异步操作 清空信息
		 */
		const handleLogout = (): Promise<boolean> => {
			return new Promise<boolean>(resolve => {
				reset()
				resolve(false)
			})
		}

		/**
		 * 请求获取用户信息
		 * @returns {Promise} 返回异步操作
		 */
		const getUserInfo = (): Promise<Result<UserInfoResult>> => {
			const { send, onSuccess, onError } = useRequest(getUserInfoData(), { initialData: {} })

			// 请求成功
			onSuccess(event => {
				if (event.data.code === 200) {
					setRoles(clone(event.data.data.roles))
				} else {
					message.warning(event.data.message)
				}
			})

			// 请求错误
			onError(event => {
				message.warning(event.error)
			})

			return send()
		}

		/**
		 * 设置Token
		 * @param {string} val 登录接口返回token
		 * @returns {void}
		 */
		const setToken = (val: string): void => {
			token.value = val
		}

		/**
		 * 设置权限列表
		 * @param {string} val 用户信息角色权限
		 * @returns {void}
		 */
		function setRoles(val: string[]): void {
			roles.value = val
		}

		/**
		 * 重置 清空token、权限列表、用户信息
		 * @returns {Promise} 返回异步操作
		 */
		function reset(): Promise<boolean> {
			return new Promise<boolean>(resolve => {
				setToken('')
				setRoles([])
				resolve(false)
			})
		}

		return {
			name,
			token,
			roles,
			getRoles,
			handleLogin,
			handleLogout,
			getUserInfo,
			setToken,
			reset
		}
	},
	{
		persist: {
			paths: ['token']
		}
	}
)
