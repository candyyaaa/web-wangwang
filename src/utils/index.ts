/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-04 17:49:12
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-07 17:28:46
 */
import pako from 'pako'

/**
 * @description: 解压gzip
 * @param {string} b64Data
 * @return {string} `string`
 */
export const unzip = (b64Data: string): string => {
	try {
		const strData = atob(b64Data)
		const charData = strData.split('').map(x => x.charCodeAt(0))
		const binData = new Uint8Array(charData)
		return pako.inflate(binData, { to: 'string' })
	} catch (error) {
		console.log('unzip err----------->', error)
		return ''
	}
}
