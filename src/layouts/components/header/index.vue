<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-25 17:29:39
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-08-26 22:42:52
-->
<script setup lang="ts">
import Logo from '../logo/index.vue'
import Tools from '../tools/index.vue'
</script>

<template>
	<Transition name="header-nav">
		<div h-full w-full flex items-center>
			<div h-full w-full flex items-center justify-center m="y-0 x-auto">
				<div h-full flex flex-1 flex-wrap items-center>
					<Logo />
				</div>
				<Tools />
			</div>
		</div>
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
