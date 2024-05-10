<!--
 * @Description: <权限验证>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-01 10:52:05
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-10 20:31:44
-->
<route>
{
	name: "Permission",
	meta: {
		layout: "index",
		title: "权限验证",
		"icon": "i-carbon-manage-protection",
		roles: ["admin"],
		sort: 2
	}
}
</route>

<template>
	<div h-full>
		<h1>权限验证</h1>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'Permission'
})
</script>

<style scoped></style>
