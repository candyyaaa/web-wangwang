<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-06-03 15:02:38
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-08 16:35:38
-->
<script setup lang="ts"></script>

<template>
	<div class="washing-loading-wrap">
		<div
			class="washing"
			bg="white no-repeat after:#bbdefb before:#aaa"
			rounded="md after:full before:t-none before:b"
			position="relative after:absolute before:absolute"
			top="before:full"
			right="after:0"
			bottom="after:5"
			left="1.5 after:0 before:1.5"
			h="37.5 after:24 before:1.5"
			w="30 after:24 before:2"
			m="after:auto"
			content="after:empty before:empty"
		></div>
	</div>
</template>

<style scoped>
.washing {
	background-image: linear-gradient(#ddd 50%, #bbb 51%), linear-gradient(#ddd, #ddd),
		linear-gradient(#ddd, #ddd),
		radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
		radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
		radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%);
	background-position:
		0 20px,
		45px 0,
		8px 6px,
		55px 3px,
		75px 3px,
		95px 3px;
	background-size:
		100% 4px,
		1px 23px,
		30px 8px,
		15px 15px,
		15px 15px,
		15px 15px;
	animation: shake 3s ease-in-out infinite;
	transform-origin: 60px 180px;
}

.washing:before {
	box-shadow: 102px 0 #aaa;
}

.washing:after {
	background-image: linear-gradient(to right, #0004 0%, #0004 49%, #0000 50%, #0000 100%),
		linear-gradient(135deg, #64b5f6 50%, #607d8b 51%);
	background-size:
		30px 100%,
		90px 80px;
	background-repeat: repeat, no-repeat;
	background-position: 0 0;
	border: 10px solid #ddd;
	box-shadow:
		0 0 0 4px #999 inset,
		0 0 6px 6px #0004 inset;
	animation: spin 3s ease-in-out infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(360deg);
	}

	75% {
		transform: rotate(750deg);
	}

	100% {
		transform: rotate(1800deg);
	}
}

@keyframes shake {
	65%,
	80%,
	88%,
	96% {
		transform: rotate(0.5deg);
	}

	50%,
	75%,
	84%,
	92% {
		transform: rotate(-0.5deg);
	}

	0%,
	50%,
	100% {
		transform: rotate(0);
	}
}
</style>
