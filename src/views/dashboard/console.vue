<!--
 * @Description: <主控台>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-08-31 21:47:34
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-04 02:17:36
-->
<route>
	{
		name: "DashboardConsole",
		meta: {
			layout: false,
			title: "主控台",
			hidden: true,
			roles: ["admin"],
			activeMenu: "/dashboard/monitor"
		}
	}
	</route>

<template>
	<div>
		<h1>主控台</h1>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'DashboardConsole'
})
</script>

<style scoped></style>
