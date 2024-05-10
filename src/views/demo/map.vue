<!--
 * @Description: 知识图谱演示
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-05-10 19:41:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-10 20:29:26
-->
<route>
{
	"name": "DemoMap",
	"meta": {
		"activeMenu": "/demo/map",
		"hidden": false,
		"layout": false,
		"roles": ["admin"],
		"title": "知识图谱"
	}
}
</route>

<script setup lang="ts">
import { RenderMap } from './components/map-class'
import nodesData from './components/nodes.json'
import linksData from './components/links.json'

const svgRef = ref<Element | null>(null)

onMounted(() => {
	const config = {
		el: svgRef.value as Element,
		nodes: nodesData,
		links: linksData
	}

	const renderMap = new RenderMap(config)
	renderMap.render()
})
</script>

<template>
	<div h-full>
		<svg ref="svgRef"></svg>
	</div>
</template>
