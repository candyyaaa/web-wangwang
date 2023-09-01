<!--
 * @Description: <侧边菜单>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-08-26 22:49:32
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-01 17:20:13
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import Logo from '../logo/index.vue'
import MenuItem from '../menu-item/index.vue'

const router = useRouter()

const routes = router.getRoutes()
console.log('routes ----------->', routes)

// app设置
const settingsStore = useSettingsStore()

const menuList = [
	{
		name: 'Permission',
		path: '/permission',
		props: true,
		meta: {
			layout: 'index',
			title: '权限验证',
			icon: 'i-carbon-manage-protection',
			requiresAuth: false
		}
	},
	{
		name: 'Dashboard',
		path: '/dashboard',
		props: true,
		redirect: '/dashboard/console',
		meta: {
			title: '仪表盘',
			icon: 'i-carbon-dashboard'
		},
		children: [
			{
				name: 'DashboardWorkplace',
				path: 'workplace',
				props: true,
				meta: {
					layout: 'index',
					title: '工作台',
					icon: 'i-carbon-screen',
					requiresAuth: false
				}
			},
			{
				name: 'DashboardMonitor',
				path: 'monitor',
				props: true,
				meta: {
					layout: 'index',
					title: '监控台',
					icon: 'i-carbon-cloud-monitoring',
					requiresAuth: false
				}
			},
			{
				name: 'DashboardConsole',
				path: 'console',
				props: true,
				meta: {
					layout: 'index',
					title: '主控台',
					icon: 'i-carbon-home',
					requiresAuth: false
				}
			}
		]
	}
]

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
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
					<template v-for="item in menuList" :key="item.path">
						<MenuItem :itemData="item" />
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
	transition: opacity 0.3s, transform 0.3s;
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
