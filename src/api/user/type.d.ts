/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-05 09:44:46
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-06 10:20:57
 */
import type { Gender } from '@/constants/enum'

export interface LoginParams {
	account: string
	password: string
}

export interface LoginResult {
	token: string
	tokenType: string
}

export interface UserInfoResult {
	account: string
	id: string
	username: string
	gender: Gender
	age: number
	phone: string
	roles: string[]
}
