/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Description: 生成渲染知识库的图谱
 * @Author: Smellycat littlecandyi@163.com
 * @Date: 2024-05-10 17:36:23
 * @LastEditors: Smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-11 17:53:29
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
	private svg: d3.Selection<Element, unknown, null, undefined>
	private nodes: Nodes[]
	private links: Links[]
	private colors: string[]
	private selectNodeData: any

	// 节点是否被点击
	isNodeClicked = false

	constructor(config: MapConfig) {
		this.svg = d3.select(config.el)
		this.nodes = config.nodes
		this.links = config.links
		this.selectNodeData = {}

		// 图例颜色
		this.colors = [
			'#3555d3',
			'#5f77d6',
			'#8595d8',
			'#99aebe',
			'#0591b5',
			'#3598b1',
			'#91d9eb',
			'#bce8f3',
			'#d4e8ed'
		]
	}

	/**
	 * 渲染图谱
	 * @returns {void}
	 */
	render(): void {
		// 渲染前清空svg内的元素
		this.svg.selectAll('*').remove()

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const _this = this

		const svg = this.svg
			.on('click', () => {
				this.isNodeClicked = false
				// 移除所有样式
				this.clearGraphStyle()
			})
			// 给画布绑定zoom事件（缩放、平移）
			.call(
				d3.zoom().on('zoom', event => {
					svg.attr('transform', event.transform)
				})
			)
			.append('g')
			.attr('class', 'container')

		// 关系箭头
		this.drawMarker()

		// 定义碰撞检测模型
		const forceCollide = d3
			.forceCollide()
			.radius(() => 16 * 3)
			.iterations(0.15)
			.strength(0.75)

		// 利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点
		const simulation = d3
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

		// D3映射数据至HTML中
		// g用于绘制所有边,selectALL选中所有的line,并绑定数据data(graph.links),enter().append("line")添加元素
		// 数据驱动文档,设置边的粗细
		const link = svg
			.append('g')
			.attr('class', 'links')
			.selectAll('line')
			.data(this.links)
			.enter()
			.append('line')
			.style('stroke', '#7c7c7c')
			.attr('stroke-width', 2)
			.join('path')
			.attr('marker-end', 'url(#posMarker)')

		const linksName = svg
			.append('g')
			.attr('class', 'linkTexts')
			.selectAll('text')
			.data(this.links)
			.join('text')
			.style('text-anchor', 'middle')
			.style('fill', '#333')
			.style('font-size', '12px')
			.text(d => d.label)

		// 添加所有的点
		// selectAll("circle")选中所有的圆并绑定数据,圆的直径为d.size
		// 再定义圆的填充色,同样数据驱动样式,圆没有描边,圆的名字为d.id
		// call()函数：拖动函数,当拖动开始绑定 dragstarted 函数，拖动进行和拖动结束也绑定函数
		const node = svg
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(this.nodes)
			.join('circle')
			.attr('r', d => {
				// 每次访问nodes的一项数据
				return d.group === 1 ? 32 : 28
			})
			.attr('fill', (d: any) => this.colors[d.group])
			.attr('stroke', 'none')
			.attr('name', (d: any) => d?.label ?? '')
			.attr('id', (d: any) => d.id)
			.call(this.drag(simulation) as any)
			.on('click', handleNodeClick)
			// 右键菜单事件
			.on('contextmenu', (event: any) => {
				event.preventDefault()
				// console.log('event contextmenu----------->', event)
			})
			// 鼠标移入事件
			.on('mouseenter', function () {
				// console.log('event ----------->', event)
				// console.dir(this)
				const node = d3.select(this)
				// node.attr("class", "fixed")
				// node.classed("fixed", true)
				// console.log(node)
				//获取被选中元素的名字
				const name = node.attr('name')
				const id = node.attr('id')
				const color = node.attr('fill')
				// console.log(name, id, color)
				//设置#info h4样式的颜色为该节点的颜色，文本为该节点name
				// _this.$set(_this.selectNodeData, 'id', id)
				// _this.$set(_this.selectNodeData, 'name', name)
				// _this.$set(_this.selectNodeData, 'color', color)
				_this.selectNodeData.id = id
				_this.selectNodeData.name = name
				_this.selectNodeData.color = color

				//遍历查找id对应的属性
				for (const item of _this.nodes) {
					if (`${item.id}` == id) {
						// for(var key in item.properties)
						// _this.$set(_this.selectNodeData, 'properties', item.properties)
						_this.selectNodeData = item
					}
				}
				// console.log('_this.selectNodeData ----------->', _this.selectNodeData)
				// 遍历节点，并调整图的样式
				_this.changeGraphStyle(name, svg)
			})
			.on('mouseleave', () => {
				// console.log('event ----------->', event)
				// console.log(this.isNodeClicked)

				if (!this.isNodeClicked) {
					this.clearGraphStyle()
				}
			})

		// 显示所有的文本
		// 设置大小、填充颜色、名字、text()设置文本
		// 使用 attr("text-anchor", "middle")设置文本居中
		const text = svg
			.append('g')
			.attr('class', 'texts')
			.selectAll('text')
			.data(this.nodes)
			.enter()
			.append('text')
			.attr('font-size', () => 12)
			.attr('fill', () => '#fff')
			.attr('name', (d: any) => d?.label ?? '')
			.attr('text-anchor', 'middle')
			.attr('x', function ({ label }) {
				return textBreaking(d3.select(this), label) as any
			})
			.call(this.drag(simulation) as any)
			.on('click', handleNodeClick)
			.on('mouseenter', function () {
				// console.log('event ----------->', event)
				// console.dir(this)
				const text = d3.select(this)
				// console.log(text)
				// 获取被选中元素的名字
				const name = text.attr('name')
				// _this.$set(_this.selectNodeData, 'name', name)
				_this.selectNodeData.name = name

				// 根据文本名称获取节点的id
				for (const item of _this.nodes) {
					if ((item?.label ?? '') == name) {
						// 设置节点id和标签属性
						// _this.$set(_this.selectNodeData, 'id', item.id)
						// _this.$set(_this.selectNodeData, 'properties', item.properties)
						_this.selectNodeData.id = item.id
						_this.selectNodeData.properties = item
						// 根据节点类型label获取节点颜色
						let index = 0
						switch (item.group) {
							case 1:
								break
							case 2:
								index = 1
								break
							case 3:
								index = 2
								break
							default:
								index = 3
								break
						}
						_this.selectNodeData.color = _this.colors[index]
					}
				}
				_this.changeGraphStyle(name, svg)
			})
			.on('mouseleave', () => {
				if (!this.isNodeClicked) {
					this.clearGraphStyle()
				}
			})

		// 圆增加title
		node.append('title').text(d => d.label)

		// simulation中ticked数据初始化并生成图形
		simulation.on('tick', ticked)
		// simulation.force('link')
		const forceLink = simulation.force('link') as any

		forceLink.links(this.links).distance((d: any) => {
			// 每一边的长度
			let distance = 20
			switch (d.source.group) {
				case 1:
					distance += 30
					break
				case 2:
					distance += 25
					break
				case 3:
					distance += 22
					break
				default:
					distance += 20
					break
			}
			switch (d.target.group) {
				case 1:
					distance += 30
					break
				case 2:
					distance += 25
					break
				case 3:
					distance += 22
					break
				default:
					distance += 20
					break
			}
			return distance * 2
		})

		/**
		 * 内部功能函数
		 * 包括：ticked、文本分隔、节点和文本的点击事件
		 */
		// ticked()函数确定link线的起始点x、y坐标 node确定中心点 文本通过translate平移变化
		function ticked() {
			link
				.attr('x1', (d: any) => d.source.x)
				.attr('y1', (d: any) => d.source.y)
				.attr('x2', (d: any) => d.target.x)
				.attr('y2', (d: any) => d.target.y)

			linksName.attr('transform', (d: any) => {
				const x = Math.min(d.source.x, d.target.x) + Math.abs(d.source.x - d.target.x) / 2
				const y = Math.min(d.source.y, d.target.y) + Math.abs(d.source.y - d.target.y) / 2 - 1
				const tanA = Math.abs(d.source.y - d.target.y) / Math.abs(d.source.x - d.target.x)
				let angle = (Math.atan(tanA) / Math.PI) * 180
				// let angle = Math.atan2(1,1)/Math.PI*180
				// console.log(angle)
				// 第一、二象限额外处理
				if (d.source.x > d.target.x) {
					// 第二象限
					if (d.source.y <= d.target.y) {
						angle = -angle
					}
					// else {  // 第三象限
					//   angle = angle
					// }
				} else if (d.source.y > d.target.y) {
					// 第一象限
					angle = -angle
				}
				return 'translate(' + x + ',' + y + ')' + 'rotate(' + angle + ')'
			})

			node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)

			text.attr('transform', function (d: any) {
				let size = 15
				switch (d.group) {
					case 1:
						break
					case 2:
						size = 14
						break
					case 3:
						size = 13
						break
					default:
						size = 12
						break
				}
				size -= 5
				return 'translate(' + (d.x - size / 2 + 3) + ',' + (d.y + size / 2) + ')'
			})
		}

		/**
		 * 文本分隔（根据字数在当前选择器中分隔三行，超过10字省略）
		 * @method textBreaking
		 * @param {any} d3text - 文本对应的DOM对象
		 * @param {string} text - 节点名称的文本值
		 * @return {void}
		 */
		function textBreaking(d3text: any, text: string): void {
			const len = text.length

			if (len <= 3) {
				d3text.append('tspan').attr('x', 0).attr('y', 2).text(text)
			} else {
				const topText = text.substring(0, 3)
				const midText = text.substring(3, 7)
				let botText = text.substring(7, len)
				let topY = -16
				let midY = 0
				const botY = 16
				if (len <= 7) {
					topY += 10
					midY += 10
				} else if (len > 10) {
					botText = text.substring(7, 9) + '...'
				}

				d3text.text('')
				d3text
					.append('tspan')
					.attr('x', 0)
					.attr('y', topY)
					.text(function () {
						return topText
					})
				d3text
					.append('tspan')
					.attr('x', 0)
					.attr('y', midY)
					.text(function () {
						return midText
					})
				d3text
					.append('tspan')
					.attr('x', 0)
					.attr('y', botY)
					.text(function () {
						return botText
					})
			}
		}

		// 分别定义节点和文本的点击事件
		// 优化：由于点击前必定触发mouseenter事件，所以不用再去查找节点id
		//      直接根据this.selectNodeData拿到节点信息
		// 优化后：只需定义一个点击事件即可
		function handleNodeClick(event: any) {
			console.log('handleNodeClick ----------->', event)
			// console.log('node clicked!')
			// sticked用于固定节点（无法实现节点固定功能）
			// delete d.fx
			// delete d.fy
			// d3.select(this).classed("fixed", true)
			// simulation.alpha(1).restart()

			// 获取被选中元素信息
			// const node = d3.select(this)
			// let name = node.attr("name")
			// let id = node.attr("id")
			// let color = node.attr('fill')
			// console.log(name, id, color)

			// 直接通过this.selectNodeData拿到节点信息
			event.cancelBubble = true
			event.stopPropagation() // 阻止事件冒泡

			const name = _this.selectNodeData.name
			_this.isNodeClicked = true
			_this.changeGraphStyle(name, svg)

			return false
		}
	}

	/**
	 * 绘制箭头
	 */
	drawMarker() {
		// 定义箭头的标识
		const defs = this.svg.append('defs')

		defs
			.append('marker')
			.attr('id', 'posMarker')
			.attr('orient', 'auto')
			.attr('stroke-width', 2)
			.attr('markerUnits', 'strokeWidth')
			.attr('markerUnits', 'userSpaceOnUse')
			.attr('viewBox', '0 -5 10 10')
			.attr('refX', 31)
			.attr('refY', 0)
			.attr('markerWidth', 12)
			.attr('markerHeight', 12)
			.append('path')
			.attr('d', 'M 0 -5 L 10 0 L 0 5')
			.attr('fill', '#797979')
			.attr('stroke-opacity', 0.6)

		defs
			.append('marker')
			.attr('id', 'posActMarker')
			.attr('orient', 'auto')
			.attr('stroke-width', 2)
			.attr('markerUnits', 'strokeWidth')
			.attr('markerUnits', 'userSpaceOnUse')
			.attr('viewBox', '0 -5 10 10')
			.attr('refX', 31)
			.attr('refY', 0)
			.attr('markerWidth', 12)
			.attr('markerHeight', 12)
			.append('path')
			.attr('d', 'M 0 -5 L 10 0 L 0 5')
			.attr('fill', '#f00')
			.attr('stroke-opacity', 0.6)
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

	/**
	 * 根据当前节点名称来更改图样式
	 */
	changeGraphStyle(name: string, svg: d3.Selection<SVGGElement, unknown, null, undefined>): void {
		// console.log(this.isNodeClicked)
		// 选择#svg1 .nodes中所有的circle，再增加个class
		svg
			.select('.nodes')
			.selectAll('circle')
			.attr('class', (d: any) => {
				// console.log('d ----------->', d)
				// 节点属性name是否等于name，返回fixed（激活选中样式）
				if (d?.label ?? '' == name) {
					return 'fixed'
				}
				// 当前节点返回空，否则其他节点循环判断是否被隐藏起来(CSS设置隐藏)
				else {
					// links链接的起始节点进行判断,如果其id等于name则显示这类节点
					// 注意: graph = data
					for (let i = 0; i < this.links.length; i++) {
						// 如果links的起点等于name，并且终点等于正在处理的则显示
						console.log('this.links[i] ----------->', this.links[i])
						const link = this.links[i] as any

						if ((link['source']?.label ?? '') == name && link['target'].id == d.id) {
							return 'active'
						}
						if ((link['target']?.label ?? '') == name && link['source'].id == d.id) {
							return 'active'
						}
					}
					return this.isNodeClicked ? 'inactive' : ''
				}
			})
		// 处理相邻的文字是否隐藏
		svg
			.select('.texts')
			.selectAll('text')
			.attr('class', (d: any) => {
				// 节点属性name是否等于name，返回fixed（激活选中样式）
				if (d?.label ?? '' == name) {
					return ''
				} else {
					// 当前节点返回空，否则其他节点循环判断是否被隐藏起来(CSS设置隐藏)

					// links链接的起始节点进行判断,如果其id等于name则显示这类节点
					// 注意: graph = data
					for (let i = 0; i < this.links.length; i++) {
						// 如果links的起点等于name，并且终点等于正在处理的则显示
						const link = this.links[i] as any

						if ((link['source']?.label ?? '') == name && link['target'].id == d.id) {
							return ''
						}
						if ((link['target']?.label ?? '') == name && link['source'].id == d.id) {
							return ''
						}
					}
					return this.isNodeClicked ? 'inactive' : ''
				}
			})

		// 处理相邻的边line是否隐藏 注意 ||
		svg
			.select('.links')
			.selectAll('line')
			.attr('class', (d: any) => {
				if ((d.source?.label ?? '') == name || (d.target?.label ?? '') == name) {
					return 'active'
				} else {
					return this.isNodeClicked ? 'inactive' : ''
				}
			})
			.attr('marker-end', (d: any) => {
				if ((d.source?.label ?? '') == name || (d.target?.label ?? '') == name) {
					return 'url(#posActMarker)'
				} else {
					return 'url(#posMarker)'
				}
			})

		// 处理相邻的边上文字是否隐藏 注意 ||
		svg
			.select('.linkTexts')
			.selectAll('text')
			.attr('class', (d: any) => {
				if ((d.source?.label ?? '') == name || (d.target?.label ?? '') == name) {
					return 'active'
				} else {
					return this.isNodeClicked ? 'inactive' : ''
				}
			})
	}

	/**
	 * 拖拽
	 */
	drag(simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) {
		function dragSubject(event: any) {
			return simulation.find(event.x, event.y)
		}

		function dragStarted(event: any) {
			if (!event.active) simulation.alphaTarget(0.3).restart()
			event.subject.fx = event.subject.x
			event.subject.fy = event.subject.y
		}

		function dragged(event: any) {
			event.subject.fx = event.x
			event.subject.fy = event.y
		}

		function dragEnded(event: any) {
			if (!event.active) simulation.alphaTarget(0)
			// 注释以下代码，使拖动结束后固定节点
			// event.subject.fx = null;
			// event.subject.fy = null;
		}

		return d3
			.drag()
			.subject(dragSubject)
			.on('start', dragStarted)
			.on('drag', dragged)
			.on('end', dragEnded)
	}
}
