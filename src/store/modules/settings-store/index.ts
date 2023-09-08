/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-26 17:58:26
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-08 17:25:05
 */
import { localeConfig } from '@/config/element-config'

export const useSettingsStore = defineStore({
	// 唯一id
	id: 'settings',
	state: () => {
		return {
			// 当前 element-plus 语言
			currentEpLang: localeConfig['zh-CN'],
			// 当前国际化语言
			currentLang: 'zh-CN',
			home: {
				title: '头部头部',
				enable: true
			},
			menu: {
				// 导航栏模式
				menuMode: 'head',
				// 导航栏填充样式 - 'default' | 'radius'
				menuFillStyle: 'radius',
				// 菜单导航是否收起 - 'false' | true
				collapse: false
			},
			// 标签栏
			tabBar: {
				// fashion | card | diamond
				style: 'fashion'
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
		},
		/**
		 * @description: 设置导航栏填充样式
		 * @param {string} style
		 */
		setMenuFillStyle(style: 'default' | 'radius'): void {
			this.menu.menuFillStyle = style
		},
		/**
		 * @description: 切换菜单导航是否收起
		 * @param {boolean} collapse
		 */
		setMenuCollapse(collapse: boolean): void {
			this.menu.collapse = collapse
		}
	}
})
