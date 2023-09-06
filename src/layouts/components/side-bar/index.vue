<!--
 * @Description: <侧边菜单>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-08-26 22:49:32
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-06 18:02:16
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import { usePermissionStore } from '@/store/modules/permission-store'
import Logo from '../logo/index.vue'
import SideBarItem from '../side-bar-item/index.vue'

const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

function flattenRoutes(originalRoutes: any[]): any[] {
	const flattenedRoutes: any[] = []

	function flatten(route: any) {
		if (route.children && route.children.length === 1) {
			// If a route has only one child, use the child directly
			flatten(route.children[0])
		} else {
			const flattenedRoute: any = {
				path: route.path,
				meta: route.meta
			}

			if (route.children && route.children.length > 0) {
				route.children.forEach((child: any) => {
					const flattenedChild: any = {
						name: child.name || '',
						path: child.path,
						props: child.props || false,
						meta: child.meta
					}
					flattenedRoutes.push(flattenedChild)
				})
			}

			flattenedRoutes.push(flattenedRoute)
		}
	}

	originalRoutes.forEach(route => {
		flatten(route)
	})

	return flattenedRoutes
}

const resList = flattenRoutes(permissionStore.getMenus)
console.log('resList ----------->', resList)
</script>

<template>
	<div h-full w-full>
		<div h-12.5 px-2.5 bg="#222b45">
			<Logo :show-logo="settingsStore.menu.menuMode === 'single'" />
		</div>
		<TransitionGroup name="aside-menu">
			<div
				:p="settingsStore.menu.menuFillStyle === 'radius' ? 'x-2.5 t-2.5' : '0'"
				:key="'menu-wrap'"
			>
				<el-menu
					class="menu-box w-[inherit] transition-colors-300 b-r-0!"
					:class="{ 'menu-box__radius': settingsStore.menu.menuFillStyle === 'radius' }"
					:collapse="settingsStore.menu.collapse"
					default-active="1-4-1"
					router
					@open="handleOpen"
					@close="handleClose"
				>
					<template v-for="item in permissionStore.getMenus" :key="item.path">
						<SideBarItem :itemData="item" :base-path="item.path" />
					</template>
				</el-menu>
			</div>
		</TransitionGroup>
	</div>
</template>

<style scoped>
.box {
	width: 10px;
}

/* 次侧边栏动画 */
.aside-menu-enter-active {
	transition:
		opacity 0.3s,
		transform 0.3s;
}

.aside-menu-enter-from,
.aside-menu-leave-active {
	opacity: 0;
	transform: translateY(30px) skewY(10deg);
}

.aside-menu-leave-active {
	position: absolute;
}
</style>
