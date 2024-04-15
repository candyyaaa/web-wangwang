<!--
 * @Description: <监控台>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-08-31 21:49:47
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-27 23:39:50
-->
<route>
{
	name: "DashboardMonitor",
	meta: {
		layout: "index",
		title: "监控台",
		roles: ["11"]
	}
}
</route>
<template>
	<div>
		<h1>监控台</h1>
		<el-button type="primary" @click="onEnterWorkplace">工作台</el-button>
		<br />
		<el-button type="primary" @click="onEnterConsole">主控台</el-button>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'DashboardMonitor'
})

const router = useRouter()

const onEnterWorkplace = () => {
	router.push({ name: 'DashboardWorkplace' })
}

const onEnterConsole = () => {
	router.push({ name: 'DashboardConsole' })
}
</script>

<style scoped></style>
