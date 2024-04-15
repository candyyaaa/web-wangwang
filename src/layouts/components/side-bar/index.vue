<!--
 * @Description: <侧边菜单>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-08-26 22:49:32
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-24 22:26:16
-->
<script setup lang="ts">
import appStore from '@/store'
import Logo from '../logo/index.vue'
import SideBarItem from '../side-bar-item/index.vue'

const route = useRoute()

const { getSortedMenus } = storeToRefs(appStore.usePermissionStore)
const { menu } = storeToRefs(appStore.useSettingsStore)

// 菜单选中、hover 样式是否圆角
const isRadius = computed<boolean>(() => {
	return menu.value.menuFillStyle === 'radius' && !menu.value.collapse
})

// 菜单模式
const menuMode = computed<string>(() => {
	return menu.value.menuMode
})

// 是否折叠菜单
const collapse = computed<boolean>(() => {
	return menu.value.collapse
})

const handleOpen = (key: string, keyPath: string[]) => {
	console.log('handleOpen ----------->', key, keyPath)
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>

<template>
	<div
		class="shadow-[10px_0_10px_-10px_#0000001f] dark:shadow-[10px_0_10px_-10px_#000000b8]"
		absolute
		bottom-0
		left-0
		top-0
		h-full
		w-full
		overflow-x-hidden
		overflow-y-auto
		overscroll-contain
		bg="white dark:#0a0a0a"
		transition-all-300
	>
		<div
			v-if="menuMode !== 'head'"
			h-12.5
			px-2.5
			:bg="menuMode === 'side' ? '#fff' : '#222b45'"
			transition-background-color-300
		>
			<Logo
				:class="[menuMode === 'side' ? 'text-[var(--el-text-color-primary)]' : 'text-white']"
				:show-logo="menuMode === 'single'"
				:show-title="!collapse"
				sidebar-logo
				text-base
			/>
		</div>
		<TransitionGroup name="aside-menu">
			<div :p="isRadius ? 'x-2.5 t-2.5' : '0'" :key="'menu-wrap'">
				<el-menu
					class="menu-box w-[inherit] transition-colors-300 b-r-0!"
					:class="{ 'menu-box__radius': isRadius }"
					:collapse="collapse"
					:default-active="(route.meta?.activeMenu as string) || route.path"
					router
					unique-opened
					@open="handleOpen"
					@close="handleClose"
				>
					<!-- <template v-for="item in permissionStore.getMenus" :key="item.path"> -->
					<template v-for="item in getSortedMenus" :key="item.path">
						<SideBarItem :itemData="item" :base-path="item.path" :isRadius="isRadius" />
					</template>
				</el-menu>
			</div>
		</TransitionGroup>
	</div>
</template>

<style scoped>
/* 次侧边栏动画 */
.aside-menu-enter-active {
	transition:
		opacity 0.3s,
		transform 0.3s;
}

.aside-menu-enter-from,
.aside-menu-leave-active {
	opacity: 0;
	transform: translateY(30px) skewY(10deg);
}

.aside-menu-leave-active {
	position: absolute;
}
</style>
