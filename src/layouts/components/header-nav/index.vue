<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-05-25 17:29:39
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-25 18:12:16
-->
<script setup lang="ts"></script>

<template>
	<Transition name="header-nav">
		<header
			display="flex"
			items="center"
			position="fixed"
			top="0"
			left="0"
			right="0"
			height="header-nav-height"
		>
			<span>头部11</span>
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
