<!--
 * @Description: <侧边菜单项>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-31 17:03:15
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-14 16:07:12
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import { resolveRoutePath } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
	itemData: RouteRecordRaw
	basePath?: string
	isRadius: boolean
}

// 组件重新定义名称
defineOptions({
	name: 'SideBarItem'
})

const settingsStore = useSettingsStore()
// 菜单选中、hover 样式是否圆角
const isChildRadius = computed(() => {
	return settingsStore.menu.menuFillStyle === 'radius' && !settingsStore.menu.collapse
})

const props = withDefaults(defineProps<Props>(), {
	basePath: ''
})

// 是否有children嵌套路由
const hasChildren = computed<boolean>(() => {
	let flag = true
	if (props.itemData.children) {
		if (props.itemData.children.every(v => v.meta?.sidebar === false)) {
			flag = false
		}
	} else {
		flag = false
	}

	return flag
})
</script>

<template>
	<el-menu-item
		v-if="!hasChildren"
		class="group transition-all-300"
		:rounded="props.isRadius ? 'xl' : 'none'"
		:index="resolveRoutePath(props.basePath, props.itemData.path)"
	>
		<el-icon v-if="props.itemData.meta?.icon">
			<div
				:class="[props.itemData.meta?.icon]"
				text-lg
				transition-transform-300
				group-hover:scale-120
			/>
		</el-icon>
		<template #title>
			<span mx-2.5>{{ props.itemData.meta?.title }}</span>
		</template>
	</el-menu-item>
	<!-- 嵌套路由 -->
	<el-sub-menu
		v-else
		transition-all-300
		:index="resolveRoutePath(props.basePath, props.itemData.path)"
	>
		<template #title>
			<el-icon v-if="props.itemData.meta?.icon">
				<div :class="[props.itemData.meta?.icon]" text-lg transition-transform-300 />
			</el-icon>
			<span mx-2.5>{{ props.itemData.meta?.title }}</span>
		</template>

		<!-- 递归循环嵌套路由 -->
		<template v-for="route in props.itemData.children" :key="route.path">
			<SideBarItem :itemData="route" :base-path="props.basePath" :isRadius="isChildRadius" />
		</template>
	</el-sub-menu>
</template>

<style scoped></style>
