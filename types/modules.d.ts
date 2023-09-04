/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 23:08:13
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-04 16:12:01
 */

declare module '*.md' {
	import { type DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

// declare module '*.vue' {
// 	import { type DefineComponent } from 'vue'
// 	const component: DefineComponent<{}, {}, any>
// 	export default component
// }

// declare module 'font-pingfang-sc' {
// 	const src: string
// 	export default src
// }
