/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-25 18:10:02
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
	rules: [['header-nav-height', { height: '4.375rem' }]],
	theme: {
		height: {
			'header-height': '4.375rem'
		}
	},
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons(),
		presetTypography(),
		presetWebFonts({})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})
