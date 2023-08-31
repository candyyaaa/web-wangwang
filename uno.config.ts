/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-01 00:39:14
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
		'icon-btn':
			'inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:text-teal-600 hover:scale-105'
	},
	theme: {},
	presets: [
		// uno 默认预设
		presetUno(),
		// 属性模式预设
		presetAttributify(),
		// 图标预设
		presetIcons({ scale: 1.2, warn: true }),
		// 排版预设
		presetTypography(),
		// 字体预设
		presetWebFonts({})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})
