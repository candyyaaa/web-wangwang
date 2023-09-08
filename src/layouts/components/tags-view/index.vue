<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-07 15:24:08
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-08 18:14:07
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'

const settingsStore = useSettingsStore()

// 是否折叠菜单
const collapse = computed<boolean>(() => {
	return settingsStore.menu.collapse
})

// 标签栏风格
const tabBarStyle = computed<string>(() => {
	return settingsStore.tabBar.style
})

const tabList = [
	{
		title: '主页'
	},
	{
		title: '权限验证'
	}
	// 38px
	// 0.25rem
	// class="h-[calc(3rem-8px)] line-height-[calc(3rem-10px)]"
]
</script>

<template>
	<div
		:class="[
			collapse
				? 'w-[calc(100%-4rem)] -translate-x-[calc(-50%+(100%-4rem/2))]'
				: 'w-[calc(100%-13.75rem)] -translate-x-[calc(-50%+(100%-13.75rem/2))]'
		]"
		fixed
		left="1/2"
		right-0
		z-12
		flex
		flex-col
		transition-all-300
	>
		<!-- tab页 -->
		<div class="bg-[var(--el-bg-color-page)]" relative h-12 transition-background-color-300>
			<div class="-bottom-px" absolute left-0 right-0 overflow-y-hidden whitespace-nowrap pr-12>
				<div inline-block>
					<div
						v-for="(item, index) in tabList"
						:key="index"
						v-bottom
						mr="-2.5"
						pointer-events-none
						relative
						ml-2.5
						inline-block
						h-10
						max-w-37.5
						min-w-37.5
						cursor-pointer
						font-size-3.5
						leading-9.5
					>
						<div
							absolute
							top="1/2"
							left-0
							right-0
							z-0
							mt="-1.75"
							h-3.5
							select-none
							before:content-empty
							before:empty="block absolute top-0 left-px bottom-0 w-px opacity-100 bg-[var(--el-border-color-darker)] transition-all-300 select-none"
						/>
						<div
							pointer-events-none
							absolute
							left-0
							top-0
							z-0
							h-full
							w-full
							:rounded-t="tabBarStyle === 'fashion' ? 2.5 : 0"
							bg="[var(--el-fill-color-lighter)]"
							transition-all-300
						/>

						{{ item.title }}
					</div>
				</div>
			</div>
		</div>
		<!-- tag页 -->
		<div
			class="bg-[var(--el-bg-color)] shadow-[0_0_1px_0_var(--el-border-color)]"
			h-12
			flex
			items-center
			justify-between
			transition-all-300
		>
			tag页
		</div>
	</div>
</template>

<style scoped>
.box {
	height: 64px;
}
</style>
