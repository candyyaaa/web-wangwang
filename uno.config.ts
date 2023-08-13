/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-11 10:55:41
 */
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'

export default defineConfig({
	rules: [],
	// 快捷方式
	shortcuts: {
		'nav-icon': 'cursor-pointer text-lg hover:scale-125'
	},
	theme: {},
	presets: [
		// uno 默认预设
		presetUno(),
		// 属性模式预设
		presetAttributify(),
		// 图标预设
		presetIcons({ warn: true }),
		// 排版预设
		presetTypography(),
		// 字体预设
		presetWebFonts({})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})
