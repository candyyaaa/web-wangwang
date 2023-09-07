<!--
 * @Description: <主控台>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-08-31 21:47:34
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 15:12:11
-->
<route>
{
	name: "DashboardConsole",
	meta: {
		layout: "index",
		title: "主控台",
		roles: ["11"]
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
