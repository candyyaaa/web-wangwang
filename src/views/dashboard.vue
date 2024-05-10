<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-01 10:20:02
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-10 19:31:37
-->
<route>
{
	name: "Dashboard",
	redirect: "/dashboard/console",
	meta: {
		layout: "index",
		title: "仪表盘",
		roles: ["admin"],
		icon: "i-carbon-dashboard",
		sort: 1
	}
}
</route>

<template>
	<div h-full w-full>
		<RouterView />
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'Dashboard'
})
</script>
