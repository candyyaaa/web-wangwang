<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 23:35:18
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-25 17:52:34
-->
<template>
	<div class="h-full">
		<HeaderNav>头部</HeaderNav>
		<main>
			<RouterView />
		</main>
	</div>
</template>

<script setup lang="ts">
	import HeaderNav from './components/header-nav/index.vue'
</script>

<style scoped>
	/* .layout-wrap {
		height: 100%;
	}

	header {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 0 20px;
		height: 60px;
		color: #fff;
		background-color: #f2f2f2;
		transition: background-color 0.3s, var(--el-transition-color);
	}

	main {
		height: 100%;
		padding-top: 60px;
	} */
</style>
