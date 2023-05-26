/*
 * @Description: <压缩图片资源>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 13:34:29
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 13:34:35
 */
import imagemin from 'vite-plugin-imagemin'

export default function createImagemin() {
	return imagemin({
		gifsicle: {
			optimizationLevel: 7,
			interlaced: false
		},
		optipng: {
			optimizationLevel: 7
		},
		mozjpeg: {
			quality: 20
		},
		pngquant: {
			quality: [0.8, 0.9],
			speed: 4
		},
		svgo: {
			plugins: [
				{
					name: 'removeViewBox'
				},
				{
					name: 'removeEmptyAttrs',
					active: false
				}
			]
		}
	})
}
