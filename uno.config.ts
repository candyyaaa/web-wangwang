/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-26 10:04:35
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
