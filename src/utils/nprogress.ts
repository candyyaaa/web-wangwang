/*
 * @Description: <简单封装 nprogress 进度条插件>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 22:21:36
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 02:34:01
 */

// 引入 nprogress 进度条插件
import NProgress from 'nprogress'
import '@/styles/nprogress.css'

//全局进度条的配置
NProgress.configure({
	easing: 'ease', // 动画方式
	speed: 1000, // 递增进度条的速度
	showSpinner: false, // 是否显示加载ico
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3, // 更改启动时使用的最小百分比
	parent: 'body' //指定进度条的父容器
})

// 打开进度条
export const start = () => {
	NProgress.start()
}

// 关闭进度条
export const done = () => {
	NProgress.done()
}
