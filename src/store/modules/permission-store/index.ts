/*
 * @Description: <权限状态>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-03 02:25:02
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-03 02:30:03
 */
import { Message } from 'element-plus'

export const usePermissionStore = defineStore({
	// 状态唯一id
	id: 'permission',
	state: () => {
		return {
			routes: []
		}
	},
	getters: {},
	actions: {}
})
