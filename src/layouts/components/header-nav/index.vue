<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-25 17:29:39
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-10 17:29:01
-->
<script setup lang="ts">
import Logo from '../logo/index.vue'
import Tools from '../tools/index.vue'
</script>

<template>
	<Transition name="header-nav">
		<header fixed left-0 right-0 top-0 h-17.5 flex items-center>
			<div h-full w-full flex items-center justify-center m="y-0 x-auto">
				<div h-full flex flex-1 flex-wrap items-center>
					<Logo />
				</div>
				<Tools />
			</div>
		</header>
	</Transition>
</template>

<style scoped>
/* 头部动画 */
.header-nav-enter-active,
.header-nav-leave-active {
	transition: transform 0.3s;
	/* cursor: pointer; */
}

.header-nav-enter-from,
.header-nav-leave-to {
	transform: translateY(calc(70px * -1));
}
</style>
