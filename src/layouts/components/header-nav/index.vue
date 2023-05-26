<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-25 17:29:39
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-26 18:13:51
-->
<script setup lang="ts">
	import Logo from '../logo/index.vue'
</script>

<template>
	<Transition name="header-nav">
		<header fixed left-0 right-0 top-0 flex items-center class="nav-default-h">
			<div h-full flex items-center justify-center margin="my-0 mx-auto" class="nav-default-w">
				<Logo />
			</div>
		</header>
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
		transform: translateY(calc(70px * -1));
	}
</style>
