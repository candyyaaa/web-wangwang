<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-08-23 00:43:08
-->
<script setup lang="ts">
import { buttonConfig, sizeConfig, zIndexConfig } from '@/config/element-config'
import { useSettingsStore } from '@/store/modules/settings-store'

const settingsStore = useSettingsStore()
</script>

<template>
	<ElConfigProvider
		:button="buttonConfig"
		:locale="settingsStore.currentEpLang"
		:size="sizeConfig"
		:z-index="zIndexConfig"
	>
		<RouterView #default="{ Component }">
			<component :is="Component" />
		</RouterView>
	</ElConfigProvider>
</template>

<style scoped></style>
