<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 23:05:42
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-20 10:36:41
-->
<template>
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="../../assets/icons/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="../../assets/icons/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
	<HelloWorld msg="Vite + Vue" />

	<el-button type="primary">{{ t('button.cute') }}</el-button>

	<ul class="text-ul">
		<li>阿松大</li>
	</ul>

	<WashingLoading />

	<WashingLoading />

	<WashingLoading />

	<MatchLoading />

	<CubeLoading />

	<div class="i-ant-design-down-circle-outlined" text-lg></div>

	<el-table mb-1 :data="[]" />
	<el-pagination :total="100" />

	<el-button type="primary" @click="toggleMenuFillStyle('default')">默认</el-button>
	<el-button type="primary" @click="toggleMenuFillStyle('radius')">圆角</el-button>
	<el-button type="primary" @click="toggleMenuCollapse">切换折叠状态</el-button>
	<el-button type="primary" @click="toggleMenuMode(1)">切换侧边栏模式（含主导航）</el-button>
	<el-button type="primary" @click="toggleMenuMode(2)">切换顶部模式</el-button>
	<el-button type="primary" @click="toggleMenuMode(3)">切换侧边栏模式（不含主导航）</el-button>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import HelloWorld from '../HelloWorld.vue'

const { t } = useI18n()
const settingsStore = useSettingsStore()

const toggleMenuFillStyle = (style: 'default' | 'radius') => {
	settingsStore.setMenuFillStyle(style)
}

const toggleMenuCollapse = () => {
	const isCollapse = !settingsStore.menu.collapse
	settingsStore.setMenuCollapse(isCollapse)
}

const toggleMenuMode = (type: number) => {
	switch (type) {
		case 1:
			settingsStore.menu.menuMode = 'side'
			break
		case 2:
			settingsStore.menu.menuMode = 'head'
			break
		case 3:
			settingsStore.menu.menuMode = 'single'
			break
	}
}
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}

.text-ul {
	margin-bottom: 20px;
}
</style>
