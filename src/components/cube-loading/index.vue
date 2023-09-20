<!--
 * @Description: <立方体 loading>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-20 10:16:31
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-20 10:49:24
-->
<script setup lang="ts"></script>

<template>
	<div class="spinner" h-11 w-11 preserve-3d>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<style scoped>
.spinner {
	animation: spinner-animation 2s infinite ease;
}

.spinner > div {
	background-color: rgba(0, 77, 255, 0.2);
	height: 100%;
	position: absolute;
	width: 100%;
	border: 2px solid #004dff;
}

.spinner div:nth-of-type(1) {
	transform: translateZ(-22px) rotateY(180deg);
}

.spinner div:nth-of-type(2) {
	transform: rotateY(-270deg) translateX(50%);
	transform-origin: top right;
}

.spinner div:nth-of-type(3) {
	transform: rotateY(270deg) translateX(-50%);
	transform-origin: center left;
}

.spinner div:nth-of-type(4) {
	transform: rotateX(90deg) translateY(-50%);
	transform-origin: top center;
}

.spinner div:nth-of-type(5) {
	transform: rotateX(-90deg) translateY(50%);
	transform-origin: bottom center;
}

.spinner div:nth-of-type(6) {
	transform: translateZ(22px);
}

@keyframes spinner-animation {
	0% {
		transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
	}

	50% {
		transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
	}

	100% {
		transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
	}
}
</style>
