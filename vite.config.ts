/*
 * @Description: <vite 项目配置>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 01:17:25
 */
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite'
import { pathResolve } from './vite/utils'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfig => {
	const root = process.cwd()

	// 环境变量
	const env = loadEnv(mode, root)

	// 自定义环境变量
	const { VITE_DROP_CONSOLE, VITE_PORT } = env
	const viteDropConsole = VITE_DROP_CONSOLE === 'true'
	const vitePort = Number(VITE_PORT)

	// 当前是否是构建模式
	const isBuild = command === 'build'

	return defineConfig({
		base: '/',
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
						// 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
						if (id.includes(pathResolve('/src/store/index.ts'))) {
							return 'vendor'
						}
					}
				}
			}
		},
		esbuild: {
			drop: isBuild && viteDropConsole ? ['console', 'debugger'] : []
		},
		resolve: {
			//设置别名
			alias: [
				{ find: '@', replacement: `${pathResolve('src')}/` },
				{ find: '#', replacement: `${pathResolve('types')}/` }
			]
		},

		root,

		plugins: createVitePlugins(env, isBuild),

		server: {
			// 监听所有地址
			host: '0.0.0.0',
			// 端口
			port: vitePort,
			// 服务启动时是否自动打开浏览器
			open: true,
			// 允许跨域
			cors: true,
			// 设置 https 代理
			proxy: {
				// http://127.0.0.1:4523/m1/699628-653613-default/api/user/getUserInfo
				'/api': {
					target: 'http://127.0.0.1:4523',
					changeOrigin: true,
					rewrite: path => path.replace(/\/api/, '/m1/699628-653613-default/api')
				}
			}
		}
	})
}
