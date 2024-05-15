/***
 * @Description: Eslint 扁平模式
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-05-14 23:45:42
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-15 00:30:48
 */

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
// import autoImportLint from './.eslintrc-auto-import.mjs'

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2021
			}
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	// ...autoImportLint,

	{
		ignores: [
			'*.sh',
			'node_modules',
			'*.md',
			'*.woff',
			'*.ttf',
			'.vscode',
			'.idea',
			'dist',
			'/public',
			'/docs',
			'.husky',
			'.local',
			'/bin',
			'Dockerfile',
			'.github',
			'types/auto-import.d.ts',
			'types/components.d.ts',
			'types/typed-router.d.ts',
			'/.eslintrc-auto-import.json'
		]
	}
]
