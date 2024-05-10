<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!--
 * @Description: 知识图谱
 * @Author: Smellycat littlecandyi@163.com
 * @Date: 2024-03-28 14:24:47
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-10 19:48:15
-->

<script setup lang="ts">
import * as d3 from 'd3'
import { message } from 'ant-design-vue'

interface Props {
	data: any
	names: string[]
	labels: string[]
	linkTypes: string[]
	mapVisible: boolean
	mapLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
	data: () => {
		return {
			nodes: [],
			links: []
		}
	},
	mapVisible: false,
	mapLoading: false
})

const svgDom = ref()
const svgRef = ref<SVGSVGElement | null>(null)
// d3render()最终展示到页面上的数据（节点隐藏功能）
const nodes = ref<any[]>([])
const links = ref<any[]>([])

// 图例颜色（9个颜色）
const colors = ref([
	'#3555d3',
	'#5f77d6',
	'#8595d8',
	'#99aebe',
	'#0591b5',
	'#3598b1',
	'#91d9eb',
	'#bce8f3',
	'#d4e8ed'
])

const color = d3.scaleOrdinal(d3.schemeCategory10)

// 选中节点的详细信息展示
const selectNodeData = ref<any>({})
// 图例状态（on：显示 / off：不显示）
const states = ref<string[]>([])
// 是否点击（选中）节点
const isNodeClicked = ref<boolean>(false)

// 监听是否是显示图谱
// watch(
//  () => props.mapVisible,
//  newValue => {
//    console.log('newValue ----------->', newValue)
//    if (newValue) {
//      getGraphSend()
//    }
//  },
//  {
//    immediate: true
//  }
// )

// 监听数据
watch(
	() => props.data,
	(newData, oldData) => {
		console.log('watch newData----------->', newData)
		console.log('watch oldData----------->', oldData) // 移除svg和元素注册事件，防止内存泄漏

		clear() // 初始化

		d3init()
	}
)

/**
 * 初始化
 * @returns {void}
 */
const d3init = (): void => {
	if (!svgRef.value) {
		return
	}

	links.value = props.data.links
	nodes.value = props.data.nodes

	svgDom.value = d3.select('#svg')
	const svg = d3.select(svgRef.value)

	d3render()
}

/**
 * 渲染
 * @returns {void}
 */
const d3render = (): void => {
	if (!svgDom.value) {
		return
	} // 渲染前清空svg内的元素
	svgDom.value.selectAll('*').remove()

	const svg = svgDom.value
		.on('click', () => {
			isNodeClicked.value = false // 移除所有样式
			clearGraphStyle()
		}) // 给画布绑定zoom事件（缩放、平移）
		.call(
			d3.zoom().on('zoom', event => {
				svg.attr('transform', event.transform)
			})
		)
		.append('g')
		.attr('class', 'container')

	addMarkers() // 定义碰撞检测模型

	const forceCollide = d3
		.forceCollide()
		.radius(() => 16 * 3)
		.iterations(0.15)
		.strength(0.75) // 利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点

	const simulation = d3
		.forceSimulation(nodes.value)
		.force(
			'link',
			d3.forceLink().id((d: any) => d.id)
		)
		.force('charge', d3.forceManyBody())
		.force(
			'center',
			d3.forceCenter(
				svg.node().parentElement.clientWidth / 2,
				svg.node().parentElement.clientHeight / 2
			)
		)
		.force('collision', forceCollide) // D3映射数据至HTML中
	// g用于绘制所有边,selectALL选中所有的line,并绑定数据data(graph.links),enter().append("line")添加元素
	// 数据驱动文档,设置边的粗细
	// const link = svg
	//  .append('g')
	//  .attr('class', 'links')
	//  .selectAll('line')
	//  .data(links.value)
	//  .enter()
	//  .append('line')
	//  .attr('stroke-width', () => {
	//    // 每次访问links的一项数据
	//    return 2 //所有线宽度均为2
	//  })
	//  .join('path')
	//  .attr('marker-end', 'url(#posMarker)')

	const marker = svg
		.append('g')
		.attr('class', 'showLine')
		.append('marker')
		.attr('id', 'resolved')
		.attr('markerUnits', 'userSpaceOnUse')
		.attr('viewBox', '0 -5 10 10') // 坐标系的区域
		.attr('refX', 44) // 箭头坐标
		.attr('refY', 0)
		.attr('markerWidth', 10) // 标识的大小
		.attr('markerHeight', 10)
		.attr('orient', 'auto') // 绘制方向，可设定为：auto（自动确认方向）和 角度值
		.attr('stroke-width', 2) // 箭头宽度
		.append('path')
		.attr('d', 'M0,-5L10,0L0,5') // 箭头的路径
		.attr('fill', '#000000') // 箭头颜色

	const link = svg
		.append('g')
		.selectAll('path')
		.data(links.value)
		.enter()
		.append('path') // 遍历所有数据。d表示当前遍历到的数据，返回绘制的贝塞尔曲线
		.attr('d', (link: any) => genLinkPath(link))
		.attr('id', (d: any) => {
			return 'edgepath' + d.id
		}) // 设置id，用于连线文字
		.style('stroke', '#000') // 颜色
		.style('stroke-width', 2) // 粗细
		.attr('class', 'lines')
		.attr('marker-end', 'url(#resolved)') // 根据箭头标记的id号标记箭头
	// 边上的文字

	const linksName = svg
		.append('g')
		.attr('class', 'link-text')
		.selectAll('text')
		.data(links.value)
		.enter()
		.append('text')
		.text((d: any) => d?.label ?? '')
		.style('font-size', 12)
		.attr('fill-opacity', 0) // const linksName = svg
	//  .append('g')
	//  .attr('class', 'linkTexts')
	//  .selectAll('text')
	//  .data(links.value)
	//  .join('text')
	//  .style('text-anchor', 'middle')
	//  .style('fill', '#333')
	//  .style('font-size', '12px')
	//  // .style('font-weight', 'bold')
	//  .text((d: any) => {
	//    return d?.label ?? ''
	//  })
	// 添加所有的点
	// selectAll("circle")选中所有的圆并绑定数据,圆的直径为d.size
	// 再定义圆的填充色,同样数据驱动样式,圆没有描边,圆的名字为d.id
	// call()函数：拖动函数,当拖动开始绑定dragstarted函数，拖动进行和拖动结束也绑定函数

	const node = svg
		.append('g')
		.attr('class', 'nodes')
		.selectAll('circle')
		.data(nodes.value)
		.join('circle')
		.attr('r', (d: any) => {
			// 每次访问nodes的一项数据
			return d.group === 1 ? 32 : 28
		})
		.attr('fill', (d: any) => colors.value[d.group])
		.attr('stroke', 'none')
		.attr('name', (d: any) => d?.label ?? '')
		.attr('id', (d: any) => d.id)
		.call(drag(simulation))
		.on('click', nodeClick) // 右键菜单事件
		.on('contextmenu', (event: any) => {
			event.preventDefault()
			console.log('event contextmenu----------->', event)
		}) // 鼠标移入事件
		.on('mouseenter', function (this: d3.BaseType, event: any) {
			console.log('event ----------->', event) // console.dir(this)
			const node = d3.select(this) // node.attr("class", "fixed")
			// node.classed("fixed", true)
			// console.log(node)
			//获取被选中元素的名字
			const name = node.attr('name')
			const id = node.attr('id')
			const color = node.attr('fill') // console.log(name, id, color)
			//设置#info h4样式的颜色为该节点的颜色，文本为该节点name
			// _this.$set(_this.selectNodeData, 'id', id)
			// _this.$set(_this.selectNodeData, 'name', name)
			// _this.$set(_this.selectNodeData, 'color', color)
			selectNodeData.value.id = id
			selectNodeData.value.name = name
			selectNodeData.value.color = color //遍历查找id对应的属性

			for (let item of nodes.value) {
				if (item.id == id) {
					// for(var key in item.properties)
					// _this.$set(_this.selectNodeData, 'properties', item.properties)
					selectNodeData.value.properties = item ?? {}
				}
			}
			console.log('selectNodeData.value ----------->', selectNodeData.value) // 遍历节点，并调整图的样式
			changeGraphStyle(name)
		})
		.on('mouseleave', (event: any) => {
			console.log('event ----------->', event) // console.log(this.isNodeClicked)
			if (!isNodeClicked.value) {
				clearGraphStyle()
			}
		}) // 显示所有的文本
	// 设置大小、填充颜色、名字、text()设置文本
	// 使用 attr("text-anchor", "middle")设置文本居中

	const text = svg
		.append('g')
		.attr('class', 'texts')
		.selectAll('text')
		.data(nodes.value)
		.enter()
		.append('text')
		.attr('font-size', () => 12)
		.attr('fill', () => '#fff')
		.attr('name', (d: any) => d?.label ?? '')
		.attr('text-anchor', 'middle')
		.attr('x', function (this: d3.BaseType, d: any) {
			return textBreaking(d3.select(this), d?.label ?? '')
		})
		.call(drag(simulation))
		.on('click', nodeClick)
		.on('mouseenter', function (this: d3.BaseType, event: any) {
			console.log('event ----------->', event) // console.dir(this)
			const text = d3.select(this) // console.log(text)
			// 获取被选中元素的名字
			const name = text.attr('name') // _this.$set(_this.selectNodeData, 'name', name)
			selectNodeData.value.name = name // 根据文本名称获取节点的id

			for (let item of nodes.value) {
				if ((item?.label ?? '') == name) {
					// 设置节点id和标签属性
					// _this.$set(_this.selectNodeData, 'id', item.id)
					// _this.$set(_this.selectNodeData, 'properties', item.properties)
					selectNodeData.value.id = item.id
					selectNodeData.value.properties = item // 根据节点类型label获取节点颜色
					let index = 0
					switch (item.label) {
						case props.labels[0]:
							break
						case props.labels[1]:
							index = 1
							break
						case props.labels[2]:
							index = 2
							break
						default:
							index = 3
							break
					} // _this.$set(_this.selectNodeData, 'color', _this.colors[index])
					selectNodeData.value.color = colors.value[index]
				}
			}
			changeGraphStyle(name)
		})
		.on('mouseleave', () => {
			if (!isNodeClicked.value) {
				clearGraphStyle()
			}
		}) // 圆增加title

	node.append('title').text((d: any) => d?.label ?? '') // simulation中ticked数据初始化并生成图形

	simulation.on('tick', ticked)
	;(simulation as any)
		.force('link')
		.links(links.value)
		.distance((d: any) => {
			// 每一边的长度
			let distance = 20
			switch (d.source.label) {
				case props.labels[0]:
					distance += 30
					break
				case props.labels[1]:
					distance += 25
					break
				case props.labels[2]:
					distance += 22
					break
				default:
					distance += 20
					break
			}
			switch (d.target.label) {
				case props.labels[0]:
					distance += 30
					break
				case props.labels[1]:
					distance += 25
					break
				case props.labels[2]:
					distance += 22
					break
				default:
					distance += 20
					break
			}
			return distance * 2
		}) /******************************************
	 * 内部功能函数
	 * 包括：ticked、文本分隔、节点和文本的点击事件
	 */ // ticked()函数确定link线的起始点x、y坐标 node确定中心点 文本通过translate平移变化

	function ticked() {
		// link
		//  .attr('x1', (d: any) => d.source.x)
		//  .attr('y1', (d: any) => d.source.y)
		//  .attr('x2', (d: any) => d.target.x)
		//  .attr('y2', (d: any) => d.target.y)

		linksName.attr('transform', (d: any) => {
			let x = Math.min(d.source.x, d.target.x) + Math.abs(d.source.x - d.target.x) / 2
			let y = Math.min(d.source.y, d.target.y) + Math.abs(d.source.y - d.target.y) / 2 - 1 // tanA = a / b
			// A = arctan(tanA)
			let tanA = Math.abs(d.source.y - d.target.y) / Math.abs(d.source.x - d.target.x)
			let angle = (Math.atan(tanA) / Math.PI) * 180 // let angle = Math.atan2(1,1)/Math.PI*180
			// console.log(angle)
			// 第一、二象限额外处理
			if (d.source.x > d.target.x) {
				// 第二象限
				if (d.source.y <= d.target.y) {
					angle = -angle
				} // else {  // 第三象限
				//   angle = angle
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
			switch (d.label) {
				case props.labels[0]:
					break
				case props.labels[1]:
					size = 14
					break
				case props.labels[2]:
					size = 13
					break
				default:
					size = 12
					break
			}
			size -= 5
			return 'translate(' + (d.x - size / 2 + 3) + ',' + (d.y + size / 2) + ')'
		})
	} /**
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
			let botY = 16
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
	} // 分别定义节点和文本的点击事件
	// 优化：由于点击前必定触发mouseenter事件，所以不用再去查找节点id
	//      直接根据this.selectNodeData拿到节点信息
	// 优化后：只需定义一个点击事件即可

	function nodeClick(event: any) {
		console.log('nodeClick ----------->', event) // console.log('node clicked!')
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

		const name = selectNodeData.value.name
		isNodeClicked.value = true
		changeGraphStyle(name)

		return false
	}
}

/**
 * 根据当前节点名称来更改图样式
 * @param {string} name - 节点名称
 * @returns {void}
 */
const changeGraphStyle = (name: string): void => {
	// console.log(this.isNodeClicked)
	// 选择#svg1 .nodes中所有的circle，再增加个class
	svgDom.value
		.select('.nodes')
		.selectAll('circle')
		.attr('class', (d: any) => {
			// console.log('d ----------->', d)
			// 节点属性name是否等于name，返回fixed（激活选中样式）
			if (d?.label ?? '' == name) {
				return 'fixed'
			} // 当前节点返回空，否则其他节点循环判断是否被隐藏起来(CSS设置隐藏)
			else {
				// links链接的起始节点进行判断,如果其id等于name则显示这类节点
				// 注意: graph = data
				for (var i = 0; i < links.value.length; i++) {
					// 如果links的起点等于name，并且终点等于正在处理的则显示
					console.log('links.value[i] ----------->', links.value[i])
					if (
						(links.value[i]['source']?.label ?? '') == name &&
						links.value[i]['target'].id == d.id
					) {
						return 'active'
					}
					if (
						(links.value[i]['target']?.label ?? '') == name &&
						links.value[i]['source'].id == d.id
					) {
						return 'active'
					}
				}
				return isNodeClicked.value ? 'inactive' : ''
			}
		}) // 处理相邻的文字是否隐藏
	svgDom.value
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
				for (var i = 0; i < links.value.length; i++) {
					// 如果links的起点等于name，并且终点等于正在处理的则显示
					if (
						(links.value[i]['source']?.label ?? '') == name &&
						links.value[i]['target'].id == d.id
					) {
						return ''
					}
					if (
						(links.value[i]['target']?.label ?? '') == name &&
						links.value[i]['source'].id == d.id
					) {
						return ''
					}
				}
				return isNodeClicked.value ? 'inactive' : ''
			}
		}) // 处理相邻的边line是否隐藏 注意 ||

	svgDom.value
		.select('.links')
		.selectAll('line')
		.attr('class', (d: any) => {
			if ((d.source?.label ?? '') == name || (d.target?.label ?? '') == name) {
				return 'active'
			} else {
				return isNodeClicked.value ? 'inactive' : ''
			}
		})
		.attr('marker-end', (d: any) => {
			if ((d.source?.label ?? '') == name || (d.target?.label ?? '') == name) {
				return 'url(#posActMarker)'
			} else {
				return 'url(#posMarker)'
			}
		}) // 处理相邻的边上文字是否隐藏 注意 ||

	svgDom.value
		.select('.linkTexts')
		.selectAll('text')
		.attr('class', (d: any) => {
			if ((d.source?.label ?? '') == name || (d.target?.label ?? '') == name) {
				return 'active'
			} else {
				return isNodeClicked.value ? 'inactive' : ''
			}
		})
}

/**
 * 移除所有样式
 * @returns {void}
 */
const clearGraphStyle = (): void => {
	// 移除所有样式
	svgDom.value.select('.nodes').selectAll('circle').attr('class', '')
	svgDom.value.select('.texts').selectAll('text').attr('class', '')
	svgDom.value
		.select('.links')
		.selectAll('line')
		.attr('class', '')
		.attr('marker-end', 'url(#posMarker)')
	svgDom.value.select('.linkTexts').selectAll('text').attr('class', '')
}

const drag = (simulation: d3.Simulation<any, undefined>) => {
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
		if (!event.active) simulation.alphaTarget(0) // 注释以下代码，使拖动结束后固定节点
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

/**
 * 绘制关系箭头
 * @returns {void}
 */
const addMarkers = (): void => {
	// 定义箭头的标识
	const defs = svgDom.value.append('defs')
	const posMarker = defs
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

	const posActMarker = defs
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
		.attr('stroke-opacity', 0.6) // const negMarker = defs.append("marker")
	//   .attr("id","negMarker")
	//   .attr("orient","auto")
	//   .attr("stroke-width",2)
	//   .attr("markerUnits", "strokeWidth")
	//   .attr("markerUnits", "userSpaceOnUse")
	//   .attr("viewBox", "0 -5 10 10")
	//   .attr("refX", -25)
	//   .attr("refY", 0)
	//   .attr("markerWidth", 12)
	//   .attr("markerHeight", 12)
	//   .append("path")
	//   .attr("d", "M 10 -5 L 0 0 L 10 5")
	//   .attr('fill', '#999')
	//   .attr("stroke-opacity", 0.6);
	console.log('posMarker ----------->', posMarker)
	console.log('posActMarker ----------->', posActMarker)
}

// 生成关系连线路径
const genLinkPath = (link: any) => {
	let sx = link.source.x
	let tx = link.target.x
	let sy = link.source.y
	let ty = link.target.y
	return 'M' + sx + ',' + sy + ' L' + tx + ',' + ty
}

// 隐藏该类型的所有节点（图例）
const hideNodeOfType = (event: any) => {
	if (
		nodes.value.length === props.data.nodes.length ||
		states.value.some(state => state === 'off')
	) {
		// console.log(event.target.dataset)
		const index = event.target.dataset.index
		const state = event.target.dataset.state // const nodeTypes = ['Enterprise', 'Type', 'Region', 'Country']
		// const linkTypes = ['', 'type', 'locate', 'export']
		// 图例的状态切换（对应类型的节点隐藏）
		if (state === 'on') {
			// 隐藏该类型的所有节点及关联关系
			// this.states[index] = 'off'
			// this.$set(this.states, index, 'off')
			states.value[index] = 'off'
		} else {
			// this.states[index] = 'on'
			// this.$set(this.states, index, 'on')
			states.value[index] = 'on'
		} /**************************************
		 * 状态更新后，同时对数据更新
		 */
		const indexs = states.value.map(s => {
			if (s === 'on') {
				return '1'
			} else {
				return '0'
			}
		}) // 遍历删除节点

		nodes.value = props.data.nodes.filter((node: any) => {
			for (let i = 0; i < indexs.length; i++) {
				if (node.label === props.labels[i] && indexs[i] === '0') return false
			}
			return true
		}) // 遍历删除关系

		links.value = props.data.links.filter((link: any) => {
			for (let i = 0; i < indexs.length; i++) {
				if (i === 0 && indexs[i] === '0') return false
				else if (link.type === props.linkTypes[i] && indexs[i] === '0') return false
			}
			return true
		}) // 调试时使用
		// console.log(indexs)
		// console.log(this.data.nodes.length, this.data.links.length)
		// console.log(this.nodes.length)
		// console.log(this.links.length)
		// 重新渲染
		d3render()
	} else {
		message.error('展示全部节点时才能隐藏图例')
	}
}

/**
 * 移除svg和元素注册事件，防止内存泄漏
 * @returns {void}
 */
const clear = (): void => {
	svgDom.value.on('.', null)
	svgDom.value.selectAll('*').on('.', null)
}

onMounted(() => {
	// 初始化
	d3init()
})

onBeforeUnmount(() => {
	clear()
})
</script>

<template>
	 
	<div class="map" relative h-full w-full>
		   
		<a-spin :spinning="mapLoading" h-full w-full>
			     
			<!-- 渲染容器 -->
			      <svg ref="svgRef" id="svg" h-full w-full></svg>

			     
			<!-- 绘制图例 -->
			     
			<!-- <div text="#f2f2f2 left sm" absolute bottom-4 left-8 font-bold>
      <div v-for="(name, index) in names" :key="index" mb-1>
        <span
          @click="hideNodeOfType"
          :data-state="states[index]"
          :data-index="index"
          style="cursor: pointer"
          :style="{ backgroundColor: states[index] === 'on' ? colors[index] : '#aaa' }"
          relative
          top-1
          mr-2
          inline-block
          h-4
          w-8
        ></span>
        {{ name }}
      </div>
    </div> -->
			   
		</a-spin>
		 
	</div>
</template>

<style scoped>
.map {
  :deep(.links) line {
    stroke: #797979;
    stroke-opacity: 1;

    &.inactive {
      opacity: 0.15;
    }

    &.active {
      stroke: #1e90ff;
      stroke-width: 3px;
    }

    &.hide {
      display: none !important;
    }
  }

  :deep(.nodes) circle {
    &.fixed {
      stroke: #ffc0cb;
      stroke-width: 14px;
      stroke-opacity: 0.15 + 0.3;
      border: 10px #000 solid;
    }

    &.inactive {
      opacity: 0.15;
    }

    &.active {
      stroke: #1e90ff;
      stroke-width: 4px;
    }

    &:hover {
      cursor: pointer;
    }

    &.hide {
      display: none !important;
    }
  }

  :deep(.texts) text {
    cursor: pointer;
    text-decoration: none;
    user-select: none;

    &:hover {
      cursor: pointer;
    }

    &.inactive {
      opacity: 0.15;
    }
  }

  .linkTexts text {
    stroke: #ecddd8b2;
    stroke-opacity: 1;

    &.active {
      stroke: #1e90ff;
    }

    &.inactive {
      opacity: 0.15;
    }
  }
}
</style>
