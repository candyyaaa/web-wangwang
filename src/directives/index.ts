/*
 * @Description: <一次性注册 自定义指令>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-11 10:43:07
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-01-31 20:32:16
 */
import type { App } from 'vue'

interface DirectiveInstall {
	install: (app: App) => void
}

const modules = import.meta.glob<DirectiveInstall>('./*/index.ts', {
	eager: true,
	import: 'default'
})

export const setupDirective = (app: App) => {
	Object.keys(modules).forEach(item => {
		app.use(modules[item].install)
	})
}
