<!--
 * @Description: <权限验证>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-01 10:52:05
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 15:08:37
-->
<route>
{
	name: "Permission",
	meta: {
		layout: "index",
		title: "权限验证",
		"icon": "i-carbon-manage-protection",
		roles: ["1"],
		ranking: 3
	}
}
</route>

<template>
	<div>
		<h1>权限验证</h1>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'Permission'
})
</script>

<style scoped></style>
