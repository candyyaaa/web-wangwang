/*
 * @Description: <unocss 配置>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:30:47
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-12-16 00:16:47
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
	shortcuts: [
		{
			'icon-btn':
				'inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:text-teal-600 hover:scale-105'
		},
		{
			'tab-corner':
				'absolute bottom-0 h-5 w-5 rounded-100% shadow-[0_0_0_1.25rem_transparent] transition-shadow-300 select-none'
		},
		{
			'login-container':
				'flex items-center justify-center absolute top-0 w-3/5 h-full p-6 bg-login-bg transition-all-1250'
		},
		{
			'login-switch_circle':
				'absolute w-[calc(100%*1.25)] rounded-1/2 bg-login-bg shadow-[inset_8px_8px_12px_#b8bec7,inset_-8px_-8px_12px_#fff] -bottom-3/5 left-0 transition-all-1250'
		},
		{
			'login-switch_circle-t': 'left-0 w-[calc(100%*0.75)] -top-30%'
		},
		{
			'login-switch-hidden': 'absolute invisible opacity-0 transition-all-1250'
		}
	],
	theme: {
		colors: {
			loginBg: '#ecf0f3'
		},
		animation: {
			keyframes: {
				'login-expand': '{0%, 10%, 100%{ width: 40% }30%, 50%{ width: 45% }}'
			},
			durations: {
				'login-expand': '1.25s'
			},
			timingFns: {
				'login-expand': 'ease'
			}
		}
	},
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
		presetWebFonts({
			fonts: {
				sans: 'Roboto',
				mono: ['Fira Code', 'Fira Mono:400,700'],
				lobster: 'Lobster',
				lato: [
					{
						name: 'Lato',
						weights: ['400', '700'],
						italic: true
					},
					{
						name: 'sans-serif',
						provider: 'none'
					}
				]
			}

			/* 
				web-fonts生成的字体样式
				
				@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Fira+Code&family=Fira+Mono:wght@400;700&family=Lobster&family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

				.font-lato {
					font-family: "Lato", sans-serif;
				}
				.font-lobster {
					font-family: "Lobster";
				}
				.font-mono {
					font-family: "Fira Code", "Fira Mono", ui-monospace, SFMono-Regular, Menlo,
						Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
				}
				.font-sans {
					font-family: "Roboto", ui-sans-serif, system-ui, -apple-system,
						BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
						sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
						"Noto Color Emoji";
				}
			*/
		})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})
