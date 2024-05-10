/*
 * @Description: 用于生成 svg 雪碧图
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-04-23 23:45:11
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 00:10:40
 */

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export const svgIconsPlugin = (isBuild: boolean) =>
	createSvgIconsPlugin({
		// 指定需要缓存的图标文件夹
		iconDirs: [resolve(process.cwd(), 'src/assets/icons/')],
		// 指定symbolId格式
		symbolId: 'icon-[dir]-[name]',
		// 是否压缩 svg
		svgoOptions: isBuild
	})
