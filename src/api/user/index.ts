/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-09-04 23:44:28
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-03 01:13:24
 */

import type { LoginParams, LoginResult, UserInfoResult } from './type'

/**
 * @description: 用户登录
 * @param {Object} params - 账密信息
 */
export const login = (params: LoginParams) =>
	alovaInst.Post<Result<LoginResult>>('/user/login', params, {
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})

/**
 * @description: 获取用户信息
 */
export const getUserInfoData = () => alovaInst.Get<Result<UserInfoResult>>('/user/getUserInfo')
