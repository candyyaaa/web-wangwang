<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 23:35:18
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-24 22:26:04
-->
<template>
	<section h-full w-full>
		<Header />

		<section relative h-full w-full pt-15 transition-padding-300>
			<aside
				class="shadow-[-1px_0_0_0_var(--el-border-color-lighter)] dark:shadow-[-1px_0_0_0_var(--el-bg-color-page)]"
				fixed
				:top="15"
				bottom-0
				z-11
				:w="collapse ? 16 : 55"
				transition-all-300
			>
				<SideBar />
			</aside>

			<main
				class="bg-[var(--el-bg-color-page)] shadow-[-1px_0_0_0_var(--el-border-color-lighter),1px_0_0_0_var(--el-border-color-lighter)] dark:shadow-[-1px_0_0_0_var(--el-bg-color-page),1px_0_0_0_var(--el-bg-color-page)]"
				min-h-full
				flex
				flex-col
				:ml="collapse ? 16 : 55"
				transition-all-300
			>
				<TagsView />

				<main relative mt-24 h-full flex-auto overflow-hidden transition-all-300>
					<RouterView />
				</main>
			</main>
		</section>
	</section>
</template>

<script setup lang="ts">
import appStore from '@/store'
import Header from './components/header/index.vue'
import SideBar from './components/side-bar/index.vue'
import TagsView from './components/tags-view/index.vue'

// 设置状态
const { menu } = storeToRefs(appStore.useSettingsStore)

// 侧边菜单是否折叠
const collapse = computed(() => {
	return menu.value.collapse
})
</script>

<style scoped>
/* .layout-wrap {
		height: 100%;
		3.75rem
	}

	header {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 0 20px;
		height: 60px;
		color: #fff;
		background-color: #f2f2f2;
		transition: background-color 0.3s, var(--el-transition-color);
	}

	main {
		height: 100%;
		padding-top: 60px;
	} */
</style>
