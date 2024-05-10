/*
 * @Description: 图片压缩插件
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-04-23 23:28:46
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 00:06:48
 */

import Imagemin from 'vite-plugin-imagemin'

export const imageminPlugin = () =>
	Imagemin({
		// gif图片压缩
		gifsicle: {
			// 选择1到3之间的优化级别
			optimizationLevel: 3, // 隔行扫描gif进行渐进式渲染
			interlaced: false
		}, // png
		optipng: {
			// 选择0到7之间的优化级别
			optimizationLevel: 7
		}, // jpeg
		mozjpeg: {
			// 压缩质量，范围从0(最差)到100(最佳)
			quality: 20
		}, // png
		pngquant: {
			// Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存
			quality: [0.8, 0.9], // 压缩速度，1(强力)到11(最快)
			speed: 4
		}, // svg压缩
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
