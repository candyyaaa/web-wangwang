/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Description: 生成渲染知识库的图谱
 * @Author: Smellycat littlecandyi@163.com
 * @Date: 2024-05-10 17:36:23
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-11 00:25:10
 */

import * as d3 from 'd3'

interface Nodes {
	id: number
	label: string
	keyword: string[]
	type: string
	group: number
}

interface Links {
	source: number
	target: number
	label: string
	keyword: string[]
	type: string
}

interface MapConfig {
	el: Element
	nodes: Nodes[]
	links: Links[]
}

export class RenderMap {
	svg: d3.Selection<Element, unknown, null, undefined>
	g: d3.Selection<SVGGElement, unknown, null, undefined>
	nodes: Nodes[]
	links: Links[]

	// 节点是否被点击
	isNodeClicked = false

	constructor(config: MapConfig) {
		this.svg = d3.select(config.el)
		this.g = this.svg.append('g').attr('class', 'container')
		this.nodes = config.nodes
		this.links = config.links
	}

	/**
	 * 渲染图谱
	 * @returns {void}
	 */
	render(): void {
		// 渲染前清空svg内的元素
		this.svg.selectAll('*').remove()

		this.svg
			.on('click', () => {
				this.isNodeClicked = false

				// 移除样式
				this.clearGraphStyle()
			})
			.call(
				// 给画布绑定zoom事件（缩放、平移）
				d3.zoom().on('zoom', event => {
					this.svg.attr('transform', event.transform)
				})
			)
			.on('dblclick.zoom', null)

		// const simulation = this.simulationCollision()
	}

	drawMarker() {
		return (
			this.g
				.append('g')
				.attr('class', 'showLine')
				.append('marker')
				.attr('id', 'resolved')
				.attr('markerUnits', 'userSpaceOnUse')
				// 坐标系的区域
				.attr('viewBox', '0 -5 10 10')
				// 箭头坐标
				.attr('refX', 44)
				.attr('refY', 0)
				// 标识的大小
				.attr('markerWidth', 10)
				.attr('markerHeight', 10)
				// 绘制方向，可设定为：auto（自动确认方向）和 角度值
				.attr('orient', 'auto')
				// 箭头宽度
				.attr('stroke-width', 2)
				.append('path')
				// 箭头的路径
				.attr('d', 'M0,-5L10,0L0,5')
				// 箭头颜色
				.attr('fill', '#000000')
		)
	}

	/**
	 * 利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点
	 */
	simulationCollision() {
		// 定义碰撞检测模型
		const forceCollide = d3
			.forceCollide()
			.radius(() => 16 * 3)
			.iterations(0.15)
			.strength(0.75)

		return d3
			.forceSimulation(this.nodes as any)
			.force(
				'link',
				d3.forceLink().id((d: any) => d.id)
			)
			.force('charge', d3.forceManyBody())
			.force(
				'center',
				d3.forceCenter(
					(this.svg.node()?.parentElement?.clientWidth ?? 0) / 2,
					(this.svg.node()?.parentElement?.clientHeight ?? 0) / 2
				)
			)
			.force('collision', forceCollide)
	}

	/**
	 * 移除所有样式
	 * @returns {void}
	 */
	clearGraphStyle(): void {
		this.svg.select('.nodes').selectAll('circle').attr('class', '')
		this.svg.select('.texts').selectAll('text').attr('class', '')
		this.svg
			.select('.links')
			.selectAll('line')
			.attr('class', '')
			.attr('marker-end', 'url(#posMarker)')
		this.svg.select('.linkTexts').selectAll('text').attr('class', '')
	}
}
