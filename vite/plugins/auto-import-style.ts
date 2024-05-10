/*
 * @Description: 按需自动引入组件库样式
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-04-23 23:14:41
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-01 23:52:13
 */

import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

export const autoImportStylePlugins = () =>
	createStyleImportPlugin({
		resolves: [ElementPlusResolve()],
		libs: [
			{
				libraryName: 'element-plus',
				esModule: true,
				resolveStyle: (name: string) => {
					return `element-plus/theme-chalk/${name}.css`
				}
			}
		]
	})
