<!--
 * @Description: <侧边菜单项>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-31 17:03:15
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-01 00:58:22
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'

// import type { RouteRecordRaw } from 'vue-router'

// interface Props {
// 	data: RouteRecordRaw[]
// }

const settingsStore = useSettingsStore()

// const props = withDefaults(defineProps<Props>(), {
// 	data: () => {
// 		return []
// 	}
// })

// console.log('props.data ----------->', props.data)
</script>

<template>
	<el-menu-item
		class="group bg-transparent transition-all-300"
		:pt="settingsStore.menu.menuFillStyle === 'radius' ? 'first:2.5' : '0'"
		bg="transparent hover:#e1e1e1! hover:dark:[var(--el-color-primary-light-5)]!"
		index="2"
	>
		<i i-carbon-chart-network text-lg transition-transform-300 group-hover:scale-120></i>
		<template #title><span mx-2.5>Navigator Two</span></template>
	</el-menu-item>
	<el-sub-menu
		transition-all-300
		:pt="settingsStore.menu.menuFillStyle === 'radius' ? 'first:2.5' : '0'"
		index="1"
	>
		<template #title>
			<i i-carbon-chart-network text-lg transition-transform-300></i>
			<span mx-2.5>Navigator One</span>
		</template>
		<el-sub-menu index="1-4">
			<template #title><span>item four</span></template>
			<el-menu-item index="1-4-1">item one</el-menu-item>
		</el-sub-menu>
	</el-sub-menu>
</template>

<style scoped></style>
