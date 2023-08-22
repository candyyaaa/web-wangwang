/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-06-15 15:41:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-08-23 00:44:14
 */

// 默认中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'

export const buttonConfig = {
	autoInsertSpace: true
}

export const localeConfig = {
	en,
	'zh-CN': zhCn,
	'zh-TW': zhTw
}

export const sizeConfig = 'default' as const

export const zIndexConfig = 2023

export default {
	// 翻译文本对象
	localeConfig,
	// 全局组件大小
	sizeConfig,
	// 全局初始化 zIndex 的值
	zIndexConfig,
	// 按钮相关配置
	buttonConfig
}
