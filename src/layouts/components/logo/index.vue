<!--
 * @Description: <logo>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-26 00:46:54
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-26 18:27:16
-->
<script setup lang="ts">
	import { useSettingsStore } from '@/store/modules/settings-store'

	const settingsStore = useSettingsStore()

	// logo 点击路由地址
	const to = computed<{ name?: string | undefined }>(() => {
		const rtn: {
			name?: string
		} = {}
		if (settingsStore.home.enable) {
			rtn.name = 'home'
		}
		return rtn
	})
</script>

<template>
	<router-link
		:to="to"
		z="1000"
		w="inherit"
		p="px-0 py-2.5"
		fixed
		top-0
		flex
		items-center
		justify-center
	>
		logo
	</router-link>
</template>

<style scoped></style>
