/*
 * @Description: <组件自动引入>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 13:25:04
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 00:01:49
 */
import AutoImportComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const autoImportComponentsPlugins = () =>
	AutoImportComponents({
		// 生成 `components.d.ts` 全局声明
		dts: './types/components.d.ts',
		// 组件的有效文件扩展名
		extensions: ['vue', 'tsx'],
		// 自定义组件的解析器
		resolvers: [ElementPlusResolver()]
	})
