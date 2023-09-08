<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-25 17:29:39
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-08 15:09:30
-->
<script setup lang="ts">
import Logo from '../logo/index.vue'
import Tools from '../tools/index.vue'
</script>

<template>
	<Transition name="header-nav">
		<el-header
			class="shadow-[-1px_0_0_0_var(--el-border-color-lighter),1px_0_0_0_var(--el-border-color-lighter),0_1px_0_0_var(--el-border-color-lighter)] dark:shadow-[-1px_0_0_0_var(--el-bg-color-page),1px_0_0_0_var(--el-bg-color-page),0_1px_0_0_var(--el-bg-color-page)]"
			height="5rem"
			bg="#222b45"
			fixed
			left-0
			right-0
			top-0
			z-10
			w-full
			text-white
			transition-background-color-300
		>
			<div h-full w-full flex items-center justify-center m="y-0 x-auto">
				<div h-full flex flex-1 flex-wrap items-center>
					<Logo text-white />
				</div>
				<Tools />
			</div>
		</el-header>
	</Transition>
</template>

<style scoped>
/* 头部动画 */
.header-nav-enter-active,
.header-nav-leave-active {
	transition: transform 0.3s;
}

.header-nav-enter-from,
.header-nav-leave-to {
	transform: translateY(calc(60px * -1));
}
</style>
