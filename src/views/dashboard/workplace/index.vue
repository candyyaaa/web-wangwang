<!--
 * @Description: <工作台>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-08-31 21:51:06
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-10-07 01:07:24
-->
<route>
{
	name: "DashboardWorkplace",
	meta: {
		layout: "index",
		title: "工作台",
		hidden: true,
		roles: ["11"],
		activeMenu: "/dashboard/monitor"
	}
}
</route>

<template>
	<div>
		<h1>工作台</h1>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'DashboardWorkplace'
})
</script>

<style scoped></style>
