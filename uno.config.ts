/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-30 00:19:04
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
			/^nav-(.*)$/,
			([, c], { theme }) => {
				if (theme.width[c]) {
					return { width: theme.width[c] }
				}

				if (theme.height[c]) {
					return { height: theme.height[c] }
				}

				if (theme.padding[c]) {
					return { 'padding-top': theme.padding[c] }
				}
			}
		]
	],
	shortcuts: {
		'nav-icon': 'cursor-pointer text-lg hover:scale-125'
	},
	theme: {
		width: {
			'default-w': '100%'
		},
		height: {
			'default-h': '4.375rem'
		},
		padding: {
			'pt-nav': '4.375rem'
		}
	},
	presets: [
		// uno 默认预设
		presetUno(),
		// 属性模式预设
		presetAttributify(),
		// 图标预设
		presetIcons(),
		// 排版预设
		presetTypography(),
		// 字体预设
		presetWebFonts({})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})
