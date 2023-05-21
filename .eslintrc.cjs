/*
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 18:15:35
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 23:15:28
 */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended',
		'./.eslintrc-auto-import.json',
		// 新增，必须放在最后面
		'plugin:prettier/recommended'
	],
	overrides: [],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// 添加组件命名忽略规则
		'vue/multi-word-component-names': [
			'error',
			{
				//需要忽略的组件名
				ignores: ['index', 'login']
			}
		],
		// // 配置是否使用.prettierrc文件中的配置
		// 'prettier/prettier': [
		// 	'error',
		// 	{},
		// 	{
		// 		usePrettierrc: true,
		// 		fileInfoOptions: {
		// 			withNodeModules: true
		// 		}
		// 	}
		// ],
		'@typescript-eslint/ban-types': [
			'error',
			{
				extendDefaults: true,
				types: {
					'{}': false
				}
			}
		],
		'@typescript-eslint/no-explicit-any': ['off']
		// 'arrow-body-style': 'off',
		// 'prefer-arrow-callback': 'off'
	}
}
