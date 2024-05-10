/*
 * @Description: 构建打包进度条插件
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-04-23 23:37:34
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 00:08:58
 */

import Progress from 'vite-plugin-progress'
import picocolors from 'picocolors'

export const progressPlugin = () =>
	Progress({
		format: `${picocolors.green(picocolors.bold('Building'))} ${picocolors.cyan(
			'[:bar]'
		)} :percent | Time: :elapseds`,
		width: 100
	})
