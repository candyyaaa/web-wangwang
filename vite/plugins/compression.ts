/*
 * @Description: 构建压缩插件
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-04-23 23:24:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 00:03:34
 */

import Compression from 'vite-plugin-compression'

import type { PluginOption } from 'vite'

export const compressionPlugin = (compress: string) => {
	const compressList = compress.split(',')

	const plugins: PluginOption[] = []

	if (compressList.includes('gzip')) {
		plugins.push(
			Compression({
				ext: '.gz',
				deleteOriginFile: false
			})
		)
	}

	if (compressList.includes('brotli')) {
		plugins.push(
			Compression({
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile: false
			})
		)
	}
	return plugins
}
