/*
 * @Description: 根据文件自动生成路由插件
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-04-23 01:00:12
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 02:30:54
 */

import vueRouter from 'unplugin-vue-router/vite'

export const vueRouterPlugin = () =>
	vueRouter({
		// 自动生成类型文件路径
		dts: './types/typed-router.d.ts',
		// 扫描文件路径
		routesFolder: 'src/views',
		// 包含的文件后缀
		extensions: ['.vue'],
		// 排除
		exclude: ['**/components/*.vue']
	})
