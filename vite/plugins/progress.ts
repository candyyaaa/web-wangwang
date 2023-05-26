/*
 * @Description: <build 进度条插件>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 13:30:35
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 13:30:41
 */
import progress from 'vite-plugin-progress'
import colors from 'picocolors'

export default function createProgress() {
	return progress({
		format: `${colors.green(colors.bold('Building'))} ${colors.cyan(
			'[:bar]'
		)} :percent | Time: :elapseds`,
		width: 100
	})
}
