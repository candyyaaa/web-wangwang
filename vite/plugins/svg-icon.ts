/*
 * @Description: <使用本地svg>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 13:25:53
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 22:25:09
 */
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcons(isBuild: boolean) {
	return createSvgIconsPlugin({
		iconDirs: [resolve(process.cwd(), 'src/assets/icons/')],
		symbolId: 'icon-[dir]-[name]',
		// 用于压缩SVG
		svgoOptions: isBuild
	})
}
