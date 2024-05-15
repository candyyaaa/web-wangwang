<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 23:05:42
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-14 23:43:37
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

	<el-button type="primary" @click="handleCute">{{ t('button.cute') }}</el-button>

	<ul class="text-ul">
		<li>阿松大</li>
	</ul>

	<WashingLoading />

	<WashingLoading />

	<WashingLoading />

	<MatchLoading />

	<CubeLoading />

	<el-table mb-1 :data="[]" />
	<!-- <el-pagination :total="100" /> -->

	<el-button type="primary" @click="toggleMenuFillStyle('default')">默认</el-button>
	<el-button type="primary" @click="toggleMenuFillStyle('radius')">圆角</el-button>
	<el-button type="primary" @click="toggleMenuCollapse">切换折叠状态</el-button>
	<el-button type="primary" @click="toggleMenuMode(1)">切换侧边栏模式（含主导航）</el-button>
	<el-button type="primary" @click="toggleMenuMode(2)">切换顶部模式</el-button>
	<el-button type="primary" @click="toggleMenuMode(3)">切换侧边栏模式（不含主导航）</el-button>
</template>

<script setup lang="ts">
import { ElMessage as message } from 'element-plus'
import HelloWorld from '../HelloWorld.vue'

const route = useRoute()
console.log('router', route.matched[0].components?.default)

const { t } = useI18n()
const { menu } = storeToRefs(appStore.useSettingsStore)
const { setMenuFillStyle, setMenuCollapse } = appStore.useSettingsStore

const toggleMenuFillStyle = (style: 'default' | 'radius') => {
	setMenuFillStyle(style)
}

const toggleMenuCollapse = () => {
	const isCollapse = !menu.value.collapse
	setMenuCollapse(isCollapse)
}

const toggleMenuMode = (type: number) => {
	switch (type) {
		case 1:
			menu.value.menuMode = 'side'
			break
		case 2:
			menu.value.menuMode = 'head'
			break
		case 3:
			menu.value.menuMode = 'single'
			break
	}
}

const handleCute = () => {
	message.warning('sssssss搜索')
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
