<!--
 * @Description: <侧边菜单>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-08-26 22:49:32
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-01 00:58:57
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import Logo from '../logo/index.vue'
import MenuItem from '../menu-item/index.vue'

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
			<div :px="settingsStore.menu.menuFillStyle === 'radius' ? '2.5' : '0'" :key="'menu-wrap'">
				<el-menu
					class="w-[inherit] transition-colors-300 b-r-0!"
					:collapse="isCollapse"
					default-active="1-4-1"
					router
					@open="handleOpen"
					@close="handleClose"
				>
					<MenuItem />
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
