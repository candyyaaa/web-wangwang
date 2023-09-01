<!--
 * @Description: <侧边菜单项>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-31 17:03:15
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-01 17:58:11
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
	itemData: RouteRecordRaw
}

// 组件重新定义名称
defineOptions({
	name: 'MenuItem'
})

const settingsStore = useSettingsStore()

const props = withDefaults(defineProps<Props>(), {})

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
		class="group bg-transparent transition-all-300"
		:rounded="settingsStore.menu.menuFillStyle === 'radius' ? 'xl' : 'none'"
		bg="transparent hover:#e1e1e1! hover:dark:[var(--el-color-primary-light-5)]!"
		:index="props.itemData.path"
	>
		<div
			:class="[props.itemData.meta?.icon]"
			text-lg
			transition-transform-300
			group-hover:scale-120
		/>
		<template #title>
			<span mx-2.5>{{ props.itemData.meta?.title }}</span>
		</template>
	</el-menu-item>
	<el-sub-menu v-else transition-all-300 :index="props.itemData.path">
		<template #title>
			<div :class="[props.itemData.meta?.icon]" text-lg transition-transform-300 />
			<span mx-2.5>{{ props.itemData.meta?.title }}</span>
		</template>

		<!-- 递归循环嵌套路由 -->
		<template v-for="route in props.itemData.children" :key="route.path">
			<MenuItem :itemData="route" />
		</template>
	</el-sub-menu>
</template>

<style scoped></style>
