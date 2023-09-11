<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-07 15:24:08
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-11 18:00:12
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import { usePermissionStore } from '@/store/modules/permission-store'
import Draggable from 'vuedraggable'

const route = useRoute()
console.log('route ----------->', route)

const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
console.log('tabList ----------->', permissionStore.getTabs)

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

// tag 滚动 refs
const tabScroll = ref<HTMLDivElement | null>(null)

// 实现鼠标滚轮 横向滚动
const onWheel = (e: WheelEvent) => {
	e.preventDefault()
	if (tabScroll.value) {
		tabScroll.value.scrollLeft += e.deltaY
	}
}
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
			<div
				ref="tabScroll"
				class="scrollbar-hidden -bottom-px"
				absolute
				left-0
				right-0
				overflow-y-hidden
				whitespace-nowrap
				pr-12
				@wheel="onWheel"
			>
				<div inline-block>
					<Draggable
						:list="permissionStore.getTabs"
						item-key="path"
						handle=".drag-handle"
						ghost-class="tag-ghost"
						force-fallback
						:animation="300"
					>
						<template #item="{ element }">
							<div
								class="group v-bottom"
								mr="-2.5 last:0"
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
									before:empty="block absolute top-0 left-px bottom-0 w-px opacity-100 bg-[var(--el-border-color-darker)] transition-all-300 select-none group-first:opacity-0"
								/>
								<div
									:rounded-t="tabBarStyle === 'fashion' ? 2.5 : 0"
									:bg="
										route.fullPath === permissionStore.menusDefaultActive
											? '[var(--el-bg-color)]'
											: '[var(--el-fill-color-lighter)]'
									"
									pointer-events-none
									absolute
									left-0
									top-0
									z-0
									h-full
									w-full
									select-none
									:opacity="route.fullPath === permissionStore.menusDefaultActive ? 100 : 0"
									transition-all-300
									group-hover:opacity-100
								/>
								<div
									pointer-events-auto
									h-full
									w-full
									flex
									select-none
									:text="
										route.fullPath === permissionStore.menusDefaultActive
											? '[var(--el-text-color-regular)]'
											: '[var(--el-text-color-placeholder)]'
									"
								>
									<div
										:mr="showActionIcon ? 7 : 2.5"
										h-full
										flex
										flex-1
										select-none
										items-center
										overflow-hidden
										whitespace-nowrap
										px-2.5
										transition-all-300
										title-mask
									>
										<div class="i-carbon-manage-protection" mr-1.5 inline-block select-none />
										<span>{{ element.meta.title }}</span>
									</div>

									<div
										class="h-[1.5em] w-[1.5em] hover:bg-[var(--el-fill-color)]"
										top="1/2"
										translate-y="-1/2"
										rounded="1/2"
										absolute
										right-1.5
										z-10
										flex
										select-none
										items-center
										justify-center
										font-size-3
										transition-color-200
									>
										<div i-carbon-close />
									</div>

									<div
										class="drag-handle"
										absolute
										bottom-0
										left-0
										right-0
										top-0
										z-9
										select-none
									></div>
								</div>
							</div>
						</template>
					</Draggable>
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

<style>
.box {
	height: 64px;
}
</style>
