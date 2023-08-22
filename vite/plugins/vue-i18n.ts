/*
 * @Description: <预编译国际化插件>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-22 10:51:31
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-22 10:54:23
 */
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { pathResolve } from '../utils'

/* https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n */
const createVueI18n = () => {
	return VueI18n({
		runtimeOnly: true,
		compositionOnly: true,
		fullInstall: true,
		include: [pathResolve('locales/**')]
	})
}

export default createVueI18n
