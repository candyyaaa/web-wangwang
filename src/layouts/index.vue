<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 23:35:18
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-31 14:10:43
-->
<template>
	<div h-full>
		<el-container h-full>
			<el-header bg="#222b45"><Header /></el-header>
			<el-container>
				<el-aside width="220px"><Menu /></el-aside>
				<el-main>
					<RouterView />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import Header from './components/header/index.vue'
import Menu from './components/menu/index.vue'
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
