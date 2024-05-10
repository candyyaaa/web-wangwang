/*
 * @Description: <vite 插件>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 12:01:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 01:48:07
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unoCSS from 'unocss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import { autoImportApi } from './auto-import-api'
import { autoImportStylePlugins } from './auto-import-style'
import { autoImportComponentsPlugins } from './auto-import-com'
import { compressionPlugin } from './compression'
import { imageminPlugin } from './imagemin'
import { layoutsPlugin } from './layouts'
import { progressPlugin } from './progress'
import { svgIconsPlugin } from './svg-icon'
import { turboConsolePlugin } from './turbo-console'
import { vueI18nPlugin } from './vue-i18n'
import { vueRouterPlugin } from './vue-router'

import type { PluginOption } from 'vite'

export default function createVitePlugins(viteEnv: Record<string, string>, isBuild = false) {
	const vitePlugins: (PluginOption | PluginOption[])[] = [
		// unplugin-vue-router
		vueRouterPlugin(),
		// @vitejs/plugin-vue
		vue(),
		// @vitejs/plugin-vue-jsx
		vueJsx(),
		// unocss/vite
		unoCSS(),
		// vite-plugin-vue-devtools
		vueDevTools()
	]

	// 环境变量
	const { VITE_USE_IMAGEMIN, VITE_BUILD_COMPRESS } = viteEnv

	// 是否压缩图片资源
	const viteUseImagemin = VITE_USE_IMAGEMIN === 'true'

	// unplugin-auto-import
	vitePlugins.push(autoImportApi())

	// vite-plugin-style-import
	vitePlugins.push(autoImportStylePlugins())

	// unplugin-vue-components
	vitePlugins.push(autoImportComponentsPlugins())

	// vite-plugin-vue-layouts
	vitePlugins.push(layoutsPlugin())

	// vite-plugin-svg-icons
	vitePlugins.push(svgIconsPlugin(isBuild))

	// unplugin-turbo-console
	vitePlugins.push(turboConsolePlugin())

	// @intlify/unplugin-vue-i18n/vite
	vitePlugins.push(vueI18nPlugin())

	if (isBuild) {
		// vite-plugin-compression
		vitePlugins.push(...compressionPlugin(VITE_BUILD_COMPRESS))

		// vite-plugin-imagemin
		viteUseImagemin && vitePlugins.push(imageminPlugin())

		// vite-plugin-progress
		vitePlugins.push(progressPlugin())
	}

	return vitePlugins
}
