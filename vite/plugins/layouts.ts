/*
 * @Description: <根据不同的组件匹配不同的layout>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 22:54:07
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 23:44:27
 */
import Layouts from 'vite-plugin-vue-layouts'

export default function createLayouts() {
	return Layouts({
		// 布局文件存放目录
		layoutsDirs: 'src/layouts',
		// 默认布局，对应 src/layout/index.vue
		defaultLayout: 'index'
	})
}
