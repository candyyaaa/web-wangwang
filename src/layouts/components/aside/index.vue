<!--
 * @Description: <侧边菜单>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-08-26 22:49:32
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-08-27 02:19:03
-->
<script setup lang="ts">
import Logo from '../logo/index.vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>

<template>
	<div h-full w-full>
		<div h-12.5 px-2.5 bg="#222b45">
			<Logo />
		</div>
		<TransitionGroup name="aside-menu">
			<div>
				<el-menu
					default-active="2"
					class="el-menu-vertical-demo"
					:collapse="isCollapse"
					@open="handleOpen"
					@close="handleClose"
				>
					<el-sub-menu index="1">
						<template #title>
							<i i-carbon-chart-network></i>
							<span>Navigator One</span>
						</template>
						<el-menu-item-group>
							<template #title><span>Group One</span></template>
							<el-menu-item index="1-1">item one</el-menu-item>
							<el-menu-item index="1-2">item two</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="Group Two">
							<el-menu-item index="1-3">item three</el-menu-item>
						</el-menu-item-group>
						<el-sub-menu index="1-4">
							<template #title><span>item four</span></template>
							<el-menu-item index="1-4-1">item one</el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
					<el-menu-item index="2">
						<i i-carbon-chart-network></i>
						<template #title>Navigator Two</template>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i i-carbon-chart-network></i>
						<template #title>Navigator Three</template>
					</el-menu-item>
					<el-menu-item index="4">
						<i i-carbon-chart-network></i>
						<template #title>Navigator Four</template>
					</el-menu-item>
				</el-menu>
			</div>
		</TransitionGroup>
	</div>
</template>

<style scoped>
/* 次侧边栏动画 */
.aside-menu-enter-active {
	transition: opacity 0.3s, transform 0.3s;
}

.aside-menu-enter-from,
.aside-menu-leave-active {
	opacity: 0;
	transform: translateY(30px) skewY(10deg);
}

.aside-menu-leave-active {
	position: absolute;
}

.box {
	width: 50px;
}
</style>
