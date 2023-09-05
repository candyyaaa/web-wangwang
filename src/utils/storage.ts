/*
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-05 09:29:08
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-05 09:35:15
 */
export class LocalCache {
	setCache<T = any>(key: string, value: T): boolean
	setCache<T = any>(key: string, value: T, localOrSessionStorage: boolean): boolean
	/**
	 * @description: 设置缓存
	 * @param {string} key - 缓存key
	 * @param {unknown} value - 缓存值
	 * @param {boolean} localOrSessionStorage  - true: localStorage, false: sessionStorage
	 * @return {boolean} 返回是否设置成功
	 */
	setCache<T = any>(key: string, value: T, localOrSessionStorage = true): boolean {
		try {
			const val = JSON.stringify(value)
			if (localOrSessionStorage) {
				window.localStorage.setItem(key, val)
			} else {
				window.sessionStorage.setItem(key, val)
			}
		} catch (error) {
			return false
		}
		return true
	}

	getCache<T = any>(key: string): T
	getCache<T = any>(key: string, localOrSessionStorage: boolean): T
	/**
	 * @description: 获取缓存
	 * @param {string} key - 缓存key
	 * @param {boolean} localOrSessionStorage  - true: localStorage, false: sessionStorage
	 * @return {unknown} 返回缓存
	 */
	getCache<T>(key: string, localOrSessionStorage = true): T {
		let res: any
		if (localOrSessionStorage) {
			const val = window.localStorage.getItem(key)
			if (val) {
				res = JSON.parse(val)
			}
		}
		const val = window.sessionStorage.getItem(key)
		if (val) {
			res = JSON.parse(val)
		}
		return res as T
	}
	deleteCache(key: string): void
	deleteCache(key: string, localOrSessionStorage: boolean): void
	/**
	 * @description: 删除缓存
	 * @param {string} key - 缓存key
	 * @param {boolean} localOrSessionStorage - true: localStorage, false: sessionStorage
	 */
	deleteCache(key: string, localOrSessionStorage = true): void {
		if (localOrSessionStorage) window.localStorage.removeItem(key)
		else window.sessionStorage.removeItem(key)
	}
	clearCache(): void
	clearCache(localOrSessionStorage: boolean): void
	/**
	 * @description: 清除所有缓存
	 * @param {boolean} localOrSessionStorage  - true: localStorage, false: sessionStorage
	 */
	clearCache(localOrSessionStorage = true): void {
		if (localOrSessionStorage) window.localStorage.clear()
		else window.sessionStorage.clear()
	}
}

// 缓存对象
export default new LocalCache()
