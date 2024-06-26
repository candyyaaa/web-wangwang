<!--
 * @Description: <侧边菜单项>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-31 17:03:15
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-03 01:10:59
-->
<script setup lang="ts">
import { resolveRoutePath } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
	basePath?: string
	isRadius: boolean
	itemData: RouteRecordRaw
}

// 组件重新定义名称
defineOptions({
	name: 'SideBarItem'
})

const { menu } = storeToRefs(appStore.useSettingsStore)
// 菜单选中、hover 样式是否圆角
const isChildRadius = computed(() => {
	return menu.value.menuFillStyle === 'radius' && !menu.value.collapse
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
	<template v-if="!props.itemData.meta?.hidden">
		<el-menu-item
			v-if="!hasChildren"
			class="group transition-all-300"
			:rounded="props.isRadius ? 'xl' : 'none'"
			:index="resolveRoutePath(props.basePath, props.itemData.path)"
		>
			<el-icon v-if="props.itemData.meta?.icon" transition-transform-300 group-hover:scale-120>
				<div :class="[props.itemData.meta?.icon]" />
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
				<el-icon v-if="props.itemData.meta?.icon" transition-transform-300>
					<div :class="[props.itemData.meta?.icon]" />
				</el-icon>
				<span mx-2.5>{{ props.itemData.meta?.title }}</span>
			</template>

			<!-- 递归循环嵌套路由 -->
			<template v-for="route in props.itemData.children" :key="route.path">
				<SideBarItem :itemData="route" :base-path="props.basePath" :isRadius="isChildRadius" />
			</template>
		</el-sub-menu>
	</template>
</template>

<style scoped></style>
