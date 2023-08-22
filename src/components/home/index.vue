<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 23:05:42
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-08-23 00:46:17
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

	<ul>
		<li>阿松大</li>
	</ul>

	<WashingLoading />

	<MatchLoading />

	<div class="i-ant-design-down-circle-outlined" text-lg></div>

	<el-table mb-1 :data="[]" />
	<el-pagination :total="100" />
</template>

<script setup lang="ts">
import HelloWorld from '../HelloWorld.vue'

const { t } = useI18n()
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
</style>
