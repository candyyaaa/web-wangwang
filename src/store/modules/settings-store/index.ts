/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-26 17:58:26
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-01 00:09:06
 */
import { localeConfig } from '@/config/element-config'

export const useSettingsStore = defineStore({
	// 唯一id
	id: 'settings',
	state: () => {
		return {
			// 当前国际化语言
			currentLang: 'zh-CN',
			// 当前 element-plus 语言
			currentEpLang: localeConfig['zh-CN'],
			home: {
				title: '头部头部',
				enable: true
			},
			menu: {
				// 导航栏模式
				menuMode: 'side',
				// 导航栏填充样式 - 'default' | 'radius'
				menuFillStyle: 'default'
			}
		}
	},
	getters: {},
	actions: {
		/**
		 * @description: 设置国际化语言
		 * @param {string} lang
		 */
		setLang(lang: string): void {
			this.currentLang = lang
			this.currentEpLang = localeConfig[lang as keyof typeof localeConfig]
		}
	}
})
