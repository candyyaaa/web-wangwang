<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-07 15:24:08
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 17:45:04
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'

const settingsStore = useSettingsStore()

// 是否折叠菜单
const collapse = computed<boolean>(() => {
	return settingsStore.menu.collapse
})
</script>

<template>
	<!-- <div
		:class="[collapse ? 'w-[calc(100%-4rem)]' : 'w-[calc(100%-13.75rem)]']"
		fixed
		:left="collapse ? 16 : 55"
		top-24
		transition-all-300
	> -->
	<div>
		<!-- tab页 -->
		<div h-12>tab页</div>
		<!-- tag页 -->
		<div class="bg-[var(--el-bg-color)]" h-12>tag页</div>
	</div>
</template>

<style scoped>
.box {
	height: 64px;
}
</style>
