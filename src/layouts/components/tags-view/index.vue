<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-07 15:24:08
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-10 20:34:07
-->
<script setup lang="ts">
import Draggable from 'vuedraggable'
import { resolve } from 'path-browserify'

import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log('route ----------->', route)

const { routes, menusDefaultActive } = storeToRefs(appStore.usePermissionStore)
const { menu, tabBar } = storeToRefs(appStore.useSettingsStore)
const { list } = storeToRefs(appStore.useTagsStore)
const { add } = appStore.useTagsStore

const affixTabs = ref<RouteRecordRaw[]>([])

// tag 滚动 refs
const tagScroll = ref<HTMLDivElement | null>(null)

// 标签也容器
const tagContainerRef = ref()

// 是否折叠菜单
const collapse = computed<boolean>(() => {
	return menu.value.collapse
})

// 标签栏风格
const tabBarStyle = computed<string>(() => {
	return tabBar.value.style
})

// 是否显示操作图标
const showActionIcon = computed<boolean>(() => {
	return true
})

// 监听路由变化 添加标签
watch(
	() => route,
	r => {
		add(r).then(() => {
			menusDefaultActive.value = r.path

			const index = list.value.findIndex(item => item.path === menusDefaultActive.value)

			if (index !== -1) {
				onScrollLeft(tagContainerRef.value.componentStructure.children[index].el.offsetLeft)
			}
		})
	},
	{
		deep: true,
		immediate: true
	}
)

// 点击标签
const handleTag = (r: RouteLocationNormalized) => {
	router.push({ path: r.fullPath })
}

const filterAffixTabs = (routes: RouteRecordRaw[], basePath: string = '/'): RouteRecordRaw[] => {
	let tags: RouteRecordRaw[] = []
	routes.forEach(route => {
		if (route.meta && route.meta.affix) {
			const tagPath = resolve(basePath, route.path)
			// tags.push({
			// 	fullPath: tagPath,
			// 	path: tagPath,
			// 	name: route.name,
			// 	meta: { ...route.meta }
			// })
			tags.push(Object.assign(route, { path: tagPath }))
		}
		if (route.children) {
			const tempTags = filterAffixTabs(route.children, route.path)
			if (tempTags.length >= 1) {
				tags = [...tags, ...tempTags]
			}
		}
	})
	return tags
}

// 实现鼠标滚轮 横向滚动
const onWheel = (e: WheelEvent) => {
	if (tagScroll.value) {
		tagScroll.value.scrollLeft += e.deltaY
	}
}

const onScrollLeft = (offsetLeft: number): void => {
	tagScroll.value?.scrollTo({ left: offsetLeft - 50, behavior: 'smooth' })
}

const onTabClose = (item: RouteLocationNormalized) => {
	const affixTabList = (affixTabs.value = filterAffixTabs(routes.value))

	let count = 1

	const count2 = (count = 3)

	console.log(' ----------->', count, count2)

	console.log('onTabClose ----------->', item, affixTabList)
}
</script>

<template>
	<div
		:class="[
			collapse
				? 'w-[calc(100%-4rem)] -translate-x-[calc(-50%+(100%-4rem/2))]'
				: 'w-[calc(100%-13.75rem)] -translate-x-[calc(-50%+(100%-13.75rem/2))]'
		]"
		left="1/2"
		fixed
		right-0
		z-12
		flex
		shrink-0
		flex-col
		transition-all-300
	>
		<!-- tab页 -->
		<div class="bg-[var(--el-bg-color-page)]" relative h-12 transition-background-color-300>
			<div
				ref="tagScroll"
				class="scrollbar-hidden -bottom-px"
				absolute
				left-0
				right-0
				overflow-y-hidden
				whitespace-nowrap
				pr-12
				@wheel.prevent="onWheel"
			>
				<div inline-block>
					<Draggable
						ref="tagContainerRef"
						:list="list"
						item-key="path"
						handle=".drag-handle"
						tag="ul"
						:animation="200"
					>
						<template #item="{ element }">
							<li
								ref="tagRef"
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
								@click="handleTag(element)"
							>
								<!-- 分隔线 -->
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

								<!-- 标签背景 20px-->
								<div
									:rounded-t="tabBarStyle === 'fashion' ? 2.5 : 0"
									:bg="
										element.path === menusDefaultActive
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
									:opacity="element.path === menusDefaultActive ? 100 : 0"
									transition-all-300
									group-hover:opacity-100
									:content="tabBarStyle === 'card' ? '' : 'after:empty before:empty'"
									before:empty="tab-corner -left-5 clip-left"
									after:empty="tab-corner -right-5 clip-right"
									:before:empty-shadow="
										element.path === menusDefaultActive
											? '[0_0_0_1.25rem_var(--el-bg-color)]'
											: '[0_0_0_1.25rem_var(--el-fill-color-lighter)]'
									"
									:after:empty-shadow="
										element.path === menusDefaultActive
											? '[0_0_0_1.25rem_var(--el-bg-color)]'
											: '[0_0_0_1.25rem_var(--el-fill-color-lighter)]'
									"
								/>

								<!-- 内容主体 -->
								<div
									pointer-events-auto
									h-full
									w-full
									flex
									select-none
									:text="
										element.path === menusDefaultActive
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
										<div i-carbon-close @click="onTabClose(element)" />
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
							</li>
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
