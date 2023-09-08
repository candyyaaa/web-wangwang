<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-07 15:24:08
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-09-09 01:44:56
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

// 是否显示操作图标
const showActionIcon = computed<boolean>(() => {
	return true
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
						class="group"
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
						hover:z-3
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
							:rounded-t="tabBarStyle === 'fashion' ? 2.5 : 0"
							bg="[var(--el-fill-color-lighter)]"
							pointer-events-none
							absolute
							left-0
							top-0
							z-0
							h-full
							w-full
							select-none
							opacity-0
							transition-all-300
							group-hover:opacity-100
						/>
						<div
							class="text-[var(--el-text-color-placeholder)]"
							pointer-events-auto
							h-full
							w-full
							flex
							select-none
						>
							<div
								:mr="showActionIcon ? 7 : 2.5"
								title-mask
								h-full
								flex
								flex-1
								select-none
								items-center
								overflow-hidden
								whitespace-nowrap
								px-2.5
								transition-all-300
							>
								<div class="i-carbon-manage-protection" mr-1.5 inline-block select-none />
								<span>{{ item.title }}</span>
							</div>

							<div
								class="h-[1.5em] w-[1.5em] hover:bg-[var(--el-fill-color)]"
								absolute
								top="1/2"
								right-1.5
								z-10
								flex
								items-center
								justify-center
								translate-y="-1/2"
								rounded="1/2"
								font-size-3
								transition-color-200
							>
								<div i-carbon-close />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- tag页 9px-->
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
