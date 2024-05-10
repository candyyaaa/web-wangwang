/*
 * @Description: <直接使用 Composition API 等，无需导入>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 12:27:00
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 02:17:54
 */
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export const autoImportApi = () =>
	AutoImport({
		// eslint报错解决
		eslintrc: {
			// 默认 `false` 默认false, 需要生成,修改文件的时候改为 true, 没有文件, 自动按需引入 eslint 会报错
			enabled: true,
			// 默认 `./.eslintrc-auto-import.json`
			filepath: './.eslintrc-auto-import.json'
		},
		// 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
		dts: './types/auto-import.d.ts',
		// 自动导入目录下的模块导出
		// 默认情况下，它只扫描目录下的一层模块
		dirs: ['src/store', 'src/api'],
		// 要注册的全局导入
		imports: [
			'vue',
			'vue-i18n',
			'pinia',
			'@vueuse/core',
			VueRouterAutoImports,
			{
				'vue-router/auto': ['useLink'],
				alova: ['useRequest']
			},
			// 类型导入
			{
				from: 'vue',
				imports: [['FunctionalComponent', 'FC']],
				type: true
			}
		]
	})
