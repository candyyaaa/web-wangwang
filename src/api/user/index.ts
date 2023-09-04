/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-09-04 23:44:28
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-09-04 23:57:26
 */
import alovaInst from '@/api'

/**
 * @description: 获取用户信息
 */
export const getUserInfoData = () => alovaInst.Get('/user/getUserInfo')
