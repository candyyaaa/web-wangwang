<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-29 00:31:35
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-05-30 00:19:13
-->
<script setup lang="ts"></script>

<template>
	<div flex items-center whitespace-nowrap px-0 py-5>
		<el-space size="large">
			<el-tooltip effect="dark" placement="bottom">
				<template #default>
					<span i-ant-design:search-outlined nav-icon></span>
				</template>
				<template #content>
					<span>搜索</span>
				</template>
			</el-tooltip>
		</el-space>
		<el-space size="large">
			<el-tooltip effect="dark" placement="bottom">
				<template #default>
					<span i-ant-design:fullscreen-outlined cursor-pointer text-lg></span>
				</template>
				<template #content>
					<span>全屏</span>
				</template>
			</el-tooltip>
		</el-space>
		<el-space size="large">
			<el-tooltip effect="dark" placement="bottom">
				<template #default>
					<span i-ant-design:fullscreen-exit-outlined cursor-pointer text-lg></span>
				</template>
				<template #content>
					<span>默认</span>
				</template>
			</el-tooltip>
		</el-space>
		<el-space size="large">
			<el-tooltip effect="dark" placement="bottom">
				<template #default>
					<span i-ant-design:sync-outlined cursor-pointer text-lg></span>
				</template>
				<template #content>
					<span>刷新</span>
				</template>
			</el-tooltip>
		</el-space>
		<el-space size="large">
			<span i-ep:search></span>
		</el-space>
		<el-space size="large">
			<span i-ep:search></span>
		</el-space>
	</div>
</template>

<style scoped></style>
