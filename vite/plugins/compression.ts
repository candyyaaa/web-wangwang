/*
 * @Description: <gzip压缩>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 13:31:38
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 13:31:50
 */
import compression from 'vite-plugin-compression'

export default function createCompression(env: Record<string, string>) {
	const { VITE_BUILD_COMPRESS } = env
	const compressList = VITE_BUILD_COMPRESS.split(',')
	const plugin: any[] = []
	if (compressList.includes('gzip')) {
		plugin.push(
			compression({
				ext: '.gz',
				deleteOriginFile: false
			})
		)
	}
	if (compressList.includes('brotli')) {
		plugin.push(
			compression({
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile: false
			})
		)
	}
	return plugin
}