/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-04 17:49:12
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-04 18:13:54
 */
import pako from 'pako'

/**
 * @description: 解压gzip
 * @param {string} b64Data
 * @return {string} `string`
 */
export const unzip = (b64Data: string): string => {
	let strData = atob(b64Data)
	const charData = strData.split('').map(function (x) {
		return x.charCodeAt(0)
	})
	const binData = new Uint8Array(charData)
	const data = pako.inflate(binData)
	strData = String.fromCharCode.apply(null, new Uint16Array(data))
	return decodeURIComponent(strData)
}
