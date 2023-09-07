<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-01 10:20:02
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 15:09:12
-->
<route>
{
	name: "Dashboard",
	redirect: "/dashboard/console",
	meta: {
		layout: "index",
		title: "仪表盘",
		roles: ["1"],
		icon: "i-carbon-dashboard",
		ranking: 2
	}
}
</route>

<template>
	<div>
		<h1>仪表盘</h1>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'Dashboard'
})
</script>
