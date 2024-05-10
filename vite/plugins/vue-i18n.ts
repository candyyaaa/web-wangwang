/*
 * @Description: i18n资源预编译
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-22 10:51:31
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 00:20:29
 */

import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { pathResolve } from '../utils'

/* https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n */
export const vueI18nPlugin = () =>
	VueI18n({
		runtimeOnly: true,
		compositionOnly: true,
		fullInstall: true,
		// 指定i18n.SFC
		defaultSFCLang: 'yaml',
		include: [pathResolve('locales/**')]
	})
