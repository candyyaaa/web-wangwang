/*
 * @Description: <pinia🍍 状态管理>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-23 18:16:00
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-26 21:46:37
 */

import { useUserStore } from './modules/user'
import { usePermissionStore } from './modules/permission'
import { useSettingsStore } from './modules/settings'
import { useTagsStore } from './modules/tags'

interface AppStore {
	useUserStore: ReturnType<typeof useUserStore>
	usePermissionStore: ReturnType<typeof usePermissionStore>
	useSettingsStore: ReturnType<typeof useSettingsStore>
	useTagsStore: ReturnType<typeof useTagsStore>
}

const appStore: AppStore = {} as AppStore

export default appStore

/**
 * 注册app状态库
 * @returns {void}
 */
export const registerStore = (): void => {
	appStore.useUserStore = useUserStore()
	appStore.usePermissionStore = usePermissionStore()
	appStore.useSettingsStore = useSettingsStore()
	appStore.useTagsStore = useTagsStore()
}
