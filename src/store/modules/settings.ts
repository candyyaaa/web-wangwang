/*
 * @Description: app设置相关状态
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-02-24 20:51:55
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-24 21:31:37
 */
import { localeConfig } from '@/config/element-config'

export const useSettingsStore = defineStore('settings', () => {
	// 当前国际化语言
	const currentLang = ref('zh-CN')
	// 当前 element-plus 国际化语言
	const currentEpLang = ref(localeConfig['zh-CN'])
	// 主页设置
	const home = ref({
		// 主页名称
		title: '主页',
		// 是否开启主页
		enable: true,
		// 主页路径
		path: '/'
	})
	// 侧边菜单设置
	const menu = ref({
		// 侧边菜单模式
		menuMode: 'head',
		// 侧边菜单填充样式 - 'default' | 'radius'
		menuFillStyle: 'radius',
		// 菜单导航是否收起 - false | true
		collapse: false
	})
	// 标签栏设置
	const tabBar = ref({
		// 标签栏样式 - fashion | card | diamond
		style: 'fashion'
	})

	/**
	 * 设置国际化语言
	 * @param {string} lang - 需要设置的国际化语言
	 * @returns {void}
	 */
	const setLang = (lang: string): void => {
		currentLang.value = lang
		currentEpLang.value = localeConfig[lang as keyof typeof localeConfig]
	}

	/**
	 * 设置侧边菜单填充样式
	 * @param {string} style - 需要设置的侧边菜单填充样式
	 * @returns {void}
	 */
	const setMenuFillStyle = (style: 'default' | 'radius'): void => {
		menu.value.menuFillStyle = style
	}

	/**
	 * 切换菜单导航是否收起
	 * @param {boolean} collapse - 布尔值，true 收起，false 不收起
	 * @returns {void}
	 */
	const setMenuCollapse = (collapse: boolean): void => {
		menu.value.collapse = collapse
	}

	return {
		currentLang,
		currentEpLang,
		home,
		menu,
		tabBar,
		setLang,
		setMenuFillStyle,
		setMenuCollapse
	}
})
