<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-10 16:46:29
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-10 17:32:23
-->
<script setup lang="ts"></script>

<template>
	<div class="match-loading__wrap">
		<div
			class="match-spinner"
			relative
			ml-18.75
			h-15
			w-15
			flex
			items-center
			justify-center
			rounded-full
		>
			<span class="match-spinner__item" animation="dominos"></span>
			<span class="match-spinner__item"></span>
			<span class="match-spinner__item"></span>
			<span class="match-spinner__item"></span>
			<span class="match-spinner__item"></span>
			<span class="match-spinner__item"></span>
			<span class="match-spinner__item"></span>
			<span class="match-spinner__item"></span>
		</div>
	</div>
</template>

<style scoped>
.match-spinner {
	/* position: relative;
	width: 60px;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	margin-left: -75px;
	margin-left: 4.6875rem; */
}

.match-spinner span {
	position: absolute;
	top: 50%;
	left: var(--left);
	width: 35px;
	height: 7px;
	background: #ffff;
	animation: dominos 1s ease infinite;
	box-shadow: 2px 2px 3px 0px black;
}

.match-spinner span:nth-child(1) {
	--left: 80px;
	animation-delay: 0.125s;
}

.match-spinner span:nth-child(2) {
	--left: 70px;
	animation-delay: 0.3s;
}

.match-spinner span:nth-child(3) {
	left: 60px;
	animation-delay: 0.425s;
}

.match-spinner span:nth-child(4) {
	animation-delay: 0.54s;
	left: 50px;
}

.match-spinner span:nth-child(5) {
	animation-delay: 0.665s;
	left: 40px;
}

.match-spinner span:nth-child(6) {
	animation-delay: 0.79s;
	left: 30px;
}

.match-spinner span:nth-child(7) {
	animation-delay: 0.915s;
	left: 20px;
}

.match-spinner span:nth-child(8) {
	left: 10px;
}

@keyframes dominos {
	50% {
		opacity: 0.7;
	}

	75% {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	80% {
		opacity: 1;
	}
}
</style>
