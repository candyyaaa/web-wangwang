/*
 * @Description: <自动引入icon>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 13:28:39
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 13:28:45
 */
import icons from 'unplugin-icons/vite'

export default function createIcons() {
	return icons({
		compiler: 'vue3',
		defaultClass: 'iconify-icon',
		autoInstall: true
	})
}
