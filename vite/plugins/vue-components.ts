/*
 * @Description: <组件自动引入>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 13:25:04
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 22:25:06
 */
import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default function createComponents() {
	return components({
		// 要搜索组件的目录的相对路径
		dirs: ['src/components'],
		// 组件的有效文件扩展名。
		extensions: ['vue'],
		// 搜索子目录
		deep: true,
		// 自定义组件的解析器
		resolvers: [ElementPlusResolver(), IconsResolver({ prefix: false })],
		// 生成 `components.d.ts` 全局声明，
		// 也接受自定义文件名的路径
		dts: './types/components.d.ts',
		// 允许子目录作为组件的命名空间前缀。
		directoryAsNamespace: false,
		// 忽略命名空间前缀的子目录路径
		// 当`directoryAsNamespace: true` 时有效
		globalNamespaces: [],
		// 自动导入指令
		// 默认值：Vue 3 的`true`，Vue 2 的`false`
		// 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
		directives: true
	})
}
