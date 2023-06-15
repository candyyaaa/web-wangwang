/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-06-15 15:41:17
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-06-15 15:57:33
 */

// 默认中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export const localeConfig = zhCn

export const sizeConfig = 'default' as const

export const zIndexConfig = 2023

export const buttonConfig = {
	autoInsertSpace: true
}

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
