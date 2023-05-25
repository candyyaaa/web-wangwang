/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-26 00:39:44
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
	// rules: [
	// 	[
	// 		'nav-h',
	// 		([, c], { theme }) => {
	// 			return { height: theme.height['nav-h'] }
	// 		}
	// 	]
	// ],
	rules: [
		[
			/^nav-(.*)$/,
			([, c], { theme }) => {
				if (theme.width[c]) {
					return { width: theme.width[c] }
				}

				if (theme.height[c]) {
					return { height: theme.height[c] }
				}
			}
		]
	],
	theme: {
		width: {
			'default-w': '100%'
		},
		height: {
			'default-h': '4.375rem'
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
