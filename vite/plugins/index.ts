/*
 * @Description: <vite 插件>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 12:01:17
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-22 10:55:13
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { PluginOption } from 'vite'

import createAutoImport from './auto-import'
import createCompression from './compression'
import createEnhanceLog from './enhance-log'
import createIcons from './icons'
import createImagemin from './imagemin'
import createLayouts from './layouts'
import createPages from './pages'
import createProgress from './progress'
import createSvgIcons from './svg-icon'
import createUnoCSS from './unocss'
import createComponents from './vue-components'
import createVueDevTools from './vue-devtools'
import createVueI18n from './vue-i18n'

export default function createVitePlugins(viteEnv: Record<string, string>, isBuild = false) {
	const vitePlugins: (PluginOption | PluginOption[])[] = [
		vue({
			reactivityTransform: true
		}),
		vueJsx()
	]

	const { VITE_USE_IMAGEMIN } = viteEnv

	const viteUseImagemin =
		typeof VITE_USE_IMAGEMIN === 'boolean' ? VITE_USE_IMAGEMIN : Boolean(VITE_USE_IMAGEMIN)

	vitePlugins.push(createAutoImport())
	isBuild && vitePlugins.push(createCompression(viteEnv))
	vitePlugins.push(createEnhanceLog())
	vitePlugins.push(createIcons())
	isBuild && viteUseImagemin && vitePlugins.push(createImagemin())
	vitePlugins.push(createLayouts())
	vitePlugins.push(createPages())
	vitePlugins.push(createProgress())
	vitePlugins.push(createSvgIcons(isBuild))
	vitePlugins.push(createUnoCSS())
	vitePlugins.push(createComponents())
	vitePlugins.push(createVueDevTools())
	vitePlugins.push(createVueI18n())

	return vitePlugins
}
