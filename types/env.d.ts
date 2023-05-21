/*
 * @Description: <env>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-21 22:50:10
 */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv {
	readonly NODE_ENV: string
	readonly VITE_APP_API_BASEURL: string
	readonly VITE_PORT: number
	readonly VITE_APP_TITLE: string
	readonly VITE_GLOB_API_URL_PREFIX: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
