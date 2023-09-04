/*
 * @Description: <工具函数集合>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-04 17:49:12
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-04 11:15:54
 */
import { resolve } from 'path-browserify'
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

/**
 * @description: 扁平化树结构
 * @param {array} tree
 * @return {*}
 */
export const flattenTree = (tree: any): any[] => {
	return [
		tree,
		...tree.children.reduceRight((acc: any, curr: any) => {
			return [...acc, ...flattenTree(curr)]
		}, [])
	]
}

// tree 数组 扁平化
export const treeToArray = (tree: any): any[] => {
	return tree.reduce((res: any, item: any) => {
		const { children, ...i } = item
		return res.concat(i, children && children.length ? treeToArray(children) : [])
	}, [])
}

/**
 * @description: 转化路由路径
 * @param {string} basePath
 * @param {string} routePath
 * @return {string} path
 */
export function resolveRoutePath(basePath: string, routePath?: string): string {
	return basePath ? resolve(basePath, routePath ?? '') : routePath ?? ''
}
