/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-14 17:36:19
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
	rules: [
		[
			'title-mask',
			{ '-webkit-mask-image': 'linear-gradient(to right, #000 calc(100% - 20px), transparent)' }
		],
		['clip-left', { 'clip-path': 'inset(50% -0.625rem 0 50%)' }],
		['clip-right', { 'clip-path': 'inset(50% 50% 0 -0.625rem)' }]
	],
	// 快捷方式
	shortcuts: {
		'icon-btn':
			'inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:text-teal-600 hover:scale-105',
		'tab-corner':
			'absolute bottom-0 h-5 w-5 rounded-100% shadow-[0_0_0_1.25rem_transparent] transition-shadow-300 select-none'
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
