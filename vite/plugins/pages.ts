/*
 * @Description: <根据创建的文件自动生成路由>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 22:58:29
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-22 14:12:07
 */
import pages from 'vite-plugin-pages'

export default function createPages() {
	return pages({
		// 需要生成路由的文件目录
		dirs: 'src/views',
		//将什么样的文件转换成路由
		extensions: ['vue'],
		// 排除在外的目录，即所有 components 目录下的 .vue 文件都不会生成路由
		exclude: ['**/components/*.vue'],
		importMode: 'async'
	})
}
