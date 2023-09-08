/*
 * @Description: <unoCSS 原子化css 引擎>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-22 11:26:53
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-08 11:47:47
 */
import unoCSS from 'unocss/vite'

export default function createUnoCSS() {
	return unoCSS({
		configFile: './uno.config.ts'
	})
}
