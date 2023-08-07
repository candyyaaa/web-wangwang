/*
 * @Description: <vite 项目配置>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-07 18:01:26
 */
import { defineConfig, loadEnv } from 'vite'
import { pathResolve } from './vite/utils'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default ({ mode, command }) => {
	console.log('mode ----------->', mode)
	console.log('command ----------->', command)

	const env = loadEnv(mode, process.cwd())
	const VITE_PORT =
		typeof env.VITE_PORT === 'number' ? env.VITE_PORT : Number(env.VITE_PORT) || 3000
	const VITE_DROP_CONSOLE =
		typeof env.VITE_DROP_CONSOLE === 'boolean'
			? env.VITE_DROP_CONSOLE
			: Boolean(env.VITE_DROP_CONSOLE)

	return defineConfig({
		base: '/web-wangwang/',
		resolve: {
			//设置别名
			alias: [
				{ find: '@', replacement: `${pathResolve('src')}/` },
				{ find: '#', replacement: `${pathResolve('types')}/` }
			]
		},
		build: {
			outDir: `dist`,
			assetsInlineLimit: 1000,
			rollupOptions: {
				output: {
					// 分类输出
					chunkFileNames: 'js/[name]-[hash].js',
					entryFileNames: 'js/[name]-[hash].js',
					assetFileNames: '[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						// 超大静态资源拆分
						if (id.includes('node_modules')) {
							return id.toString().split('node_modules/')[1].split('/')[0].toString()
						}
					}
				}
			}
		},
		esbuild: {
			drop: command === 'build' && VITE_DROP_CONSOLE ? ['console', 'debugger'] : []
		},
		plugins: createVitePlugins(env, command === 'build'),
		server: {
			// 是否开启 https
			https: false,
			// 监听所有地址
			host: '0.0.0.0',
			// 端口
			port: VITE_PORT,
			// 服务启动时是否自动打开浏览器
			open: true,
			// 允许跨域
			cors: true,
			// 设置 https 代理
			proxy: {
				'/m1/699628-0-default/api': {
					// apifox 本地 Mock
					target: 'http://127.0.0.1:4523',
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/m1^\/699628-0-default^\/api/, '')
				}
			}
		},
		css: {
			devSourcemap: true
		}
	})
}
