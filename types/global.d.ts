/*
 * @Description:
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-02-02 01:23:38
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-02 23:47:22
 */

declare global {
	/**
	 * http 请求结果码
	 */
	type HttpResultCode = 200 | 400 | 401 | 403 | 404 | 408 | 500 | 501 | 502 | 503 | 504 | 505

	/**
	 * 接口返回结果
	 */
	interface Result<T = unknown> {
		code: HttpResultCode
		message: string
		data: T
	}
}

export {}
