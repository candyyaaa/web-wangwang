/*
 * @Description: <v-size-ob 指令，可以在 dom 元素改变大小时获取 dom 元素的尺寸，并且返回尺寸>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-11 10:45:24
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-11 14:25:14
 */
import type { App } from 'vue'

const map = new WeakMap()
const ob = new ResizeObserver(entries => {
	for (const entry of entries) {
		const handler = map.get(entry.target)
		if (handler) {
			const box = entry.borderBoxSize[0]
			handler({
				width: box.inlineSize,
				height: box.blockSize
			})
		}
	}
})

export default {
	install(app: App) {
		app.directive('size-ob', {
			mounted(el, binding) {
				ob.observe(el)
				map.set(el, binding.value)
			},
			unmounted(el) {
				ob.unobserve(el)
			}
		})
	}
}
