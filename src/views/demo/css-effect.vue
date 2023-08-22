<!--
 * @Description: <css 效果>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-15 10:21:30
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-15 17:08:12
-->
<route>
{
	name: "CssEffect",
	meta: {
		layout: "index",
		title: "cssEffect",
		requiresAuth: false
	}
}
</route>

<script setup lang="ts">
// console.log(' ----------->', '@/assets/images/demo/planet-bg.png')

type Planet = {
	id: number
	label: string
}

const planetList: Planet[] = reactive([
	{
		id: 1,
		label: '水星'
	},
	{
		id: 2,
		label: '金星'
	},
	{
		id: 3,
		label: '地球'
	},
	{
		id: 4,
		label: '火星'
	},
	{
		id: 5,
		label: '木星'
	},
	{
		id: 6,
		label: '土星'
	},
	{
		id: 7,
		label: '天王星'
	},
	{
		id: 8,
		label: '海王星'
	}
])

// 旋转css变量
const planetRotateStyle = computed(() => {
	// 圆圈360°除以数据数组长度
	const degCount = 360 / planetList.length

	return {
		// 偏移距离
		'--planet-rotate-step': `${degCount}deg`,
		// 统一转动速度
		'--planet-rotate-speed': '30s'
	}
})
</script>

<template>
	<div class="css-effect__wrap" h-full>
		<h1>css 效果</h1>

		<div
			class="css-effect__planet"
			ml-4
			h-80
			w-100
			flex
			items-center
			justify-center
			bg="gradient-to-b"
			from="#020205"
			via="#170f39"
			to="#35247a"
			:style="planetRotateStyle"
		>
			<div class="planet-box" relative h-60 w-60>
				<div
					class="planet-box__item"
					v-for="item in planetList"
					:key="item.id"
					absolute
					left-0
					top-0
					h-full
					w-full
					flex
					preserve-3d
					justify-center
					rounded="1/2"
				>
					<div
						class="ball shadow-[inset_2px_8px_10px_0px_#e6a930]"
						bg="#0011327F"
						h-16
						w-16
						overflow-hidden
						rounded="1/2"
					/>
					<div class="label">{{ item.label }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.css-effect__wrap {
	/* width: 240px; */
	color: #fff;
	background-image: linear-gradient(180deg, #020205 0%, #170f39 51%, #35247a 95%);
}

.css-effect__planet .planet-box .planet-box__item:first-child {
	animation: planet-rotate-1 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .planet-box__item:nth-child(2) {
	animation: planet-rotate-2 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .planet-box__item:nth-child(3) {
	animation: planet-rotate-3 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .planet-box__item:nth-child(4) {
	animation: planet-rotate-4 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .planet-box__item:nth-child(5) {
	animation: planet-rotate-5 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .planet-box__item:nth-child(6) {
	animation: planet-rotate-6 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .planet-box__item:nth-child(7) {
	animation: planet-rotate-7 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .planet-box__item:last-child {
	animation: planet-rotate-8 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:first-child {
	animation: self-rotate-1 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:nth-child(2) {
	animation: self-rotate-2 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:nth-child(3) {
	animation: self-rotate-3 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:nth-child(4) {
	animation: self-rotate-4 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:nth-child(5) {
	animation: self-rotate-5 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:nth-child(6) {
	animation: self-rotate-6 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:nth-child(7) {
	animation: self-rotate-7 var(--planet-rotate-speed) linear infinite;
}

.css-effect__planet .planet-box .ball:last-child {
	animation: self-rotate-8 var(--planet-rotate-speed) linear infinite;
}

/* 公转动画 */
@keyframes planet-rotate-1 {
	0% {
		transform: scaleY(0.5) rotateZ(0deg);
	}
	100% {
		transform: scaleY(0.5) rotateZ(360deg);
	}
}

/* 公转动画 */
@keyframes planet-rotate-2 {
	0% {
		transform: scaleY(0.5) rotate(calc(0deg + var(--planet-rotate-step) * 1));
	}
	100% {
		transform: scaleY(0.5) rotate(calc(360deg + var(--planet-rotate-step) * 1));
	}
}

/* 公转动画 */
@keyframes planet-rotate-3 {
	0% {
		transform: scaleY(0.5) rotate(calc(0deg + var(--planet-rotate-step) * 2));
	}
	100% {
		transform: scaleY(0.5) rotate(calc(360deg + var(--planet-rotate-step) * 2));
	}
}

/* 公转动画 */
@keyframes planet-rotate-4 {
	0% {
		transform: scaleY(0.5) rotate(calc(0deg + var(--planet-rotate-step) * 3));
	}
	100% {
		transform: scaleY(0.5) rotate(calc(360deg + var(--planet-rotate-step) * 3));
	}
}

/* 公转动画 */
@keyframes planet-rotate-5 {
	0% {
		transform: scaleY(0.5) rotate(calc(0deg + var(--planet-rotate-step) * 4));
	}
	100% {
		transform: scaleY(0.5) rotate(calc(360deg + var(--planet-rotate-step) * 4));
	}
}

/* 公转动画 */
@keyframes planet-rotate-6 {
	0% {
		transform: scaleY(0.5) rotate(calc(0deg + var(--planet-rotate-step) * 5));
	}
	100% {
		transform: scaleY(0.5) rotate(calc(360deg + var(--planet-rotate-step) * 5));
	}
}

/* 公转动画 */
@keyframes planet-rotate-7 {
	0% {
		transform: scaleY(0.5) rotate(calc(0deg + var(--planet-rotate-step) * 6));
	}
	100% {
		transform: scaleY(0.5) rotate(calc(360deg + var(--planet-rotate-step) * 6));
	}
}

/* 公转动画 */
@keyframes planet-rotate-8 {
	0% {
		transform: scaleY(0.5) rotate(calc(0deg + var(--planet-rotate-step) * 7));
	}
	100% {
		transform: scaleY(0.5) rotate(calc(360deg + var(--planet-rotate-step) * 7));
	}
}

/* 自转动画 */
@keyframes self-rotate-1 {
	0% {
		transform: rotate(0deg) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(-360deg) scaleY(2) translateX(50px);
	}
}

/* 自转动画 */
@keyframes self-rotate-2 {
	0% {
		transform: rotate(calc(0deg - var(--planet-rotate-step) * 1)) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(calc(-360deg - var(--planet-rotate-step) * 1)) scaleY(2) translateX(50px);
	}
}

/* 自转动画 */
@keyframes self-rotate-3 {
	0% {
		transform: rotate(calc(0deg - var(--planet-rotate-step) * 2)) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(calc(-360deg - var(--planet-rotate-step) * 2)) scaleY(2) translateX(50px);
	}
}

/* 自转动画 */
@keyframes self-rotate-4 {
	0% {
		transform: rotate(calc(0deg - var(--planet-rotate-step) * 3)) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(calc(-360deg - var(--planet-rotate-step) * 3)) scaleY(2) translateX(50px);
	}
}

/* 自转动画 */
@keyframes self-rotate-5 {
	0% {
		transform: rotate(calc(0deg - var(--planet-rotate-step) * 4)) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(calc(-360deg - var(--planet-rotate-step) * 4)) scaleY(2) translateX(50px);
	}
}

/* 自转动画 */
@keyframes self-rotate-6 {
	0% {
		transform: rotate(calc(0deg - var(--planet-rotate-step) * 5)) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(calc(-360deg - var(--planet-rotate-step) * 5)) scaleY(2) translateX(50px);
	}
}

/* 自转动画 */
@keyframes self-rotate-7 {
	0% {
		transform: rotate(calc(0deg - var(--planet-rotate-step) * 6)) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(calc(-360deg - var(--planet-rotate-step) * 6)) scaleY(2) translateX(50px);
	}
}

/* 自转动画 */
@keyframes self-rotate-8 {
	0% {
		transform: rotate(calc(0deg - var(--planet-rotate-step) * 7)) scaleY(2) translateX(50px);
	}
	100% {
		transform: rotate(calc(-360deg - var(--planet-rotate-step) * 7)) scaleY(2) translateX(50px);
	}
}
</style>
