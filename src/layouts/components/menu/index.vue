<!--
 * @Description: <侧边菜单>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-08-26 22:49:32
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-31 17:59:31
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import Logo from '../logo/index.vue'

const router = useRouter()

const routes = router.getRoutes()
console.log('routes ----------->', routes)

// app设置
const settingsStore = useSettingsStore()

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
			<Logo :show-logo="settingsStore.menu.menuMode === 'single'" />
		</div>
		<TransitionGroup name="aside-menu">
			<div px-2.5 :key="'menu-wrap'">
				<el-menu
					class="w-[inherit] transition-colors-3 b-r-0!"
					:collapse="isCollapse"
					default-active="2"
					router
					@open="handleOpen"
					@close="handleClose"
				>
					<el-sub-menu first:pt-2.5 index="1">
						<template #title>
							<i i-carbon-chart-network></i>
							<span>Navigator One</span>
						</template>
						<el-sub-menu index="1-4">
							<template #title><span>item four</span></template>
							<el-menu-item index="1-4-1">item one</el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
					<el-menu-item first:pt-2.5 index="2">
						<i i-carbon-chart-network></i>
						<template #title>Navigator Two</template>
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
	width: 10px;
}
</style>
