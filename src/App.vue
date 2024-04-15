<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-02-24 22:25:49
-->
<script setup lang="ts">
import { buttonConfig, sizeConfig, zIndexConfig } from '@/config/element-config'
import appStore from '@/store'

const { currentEpLang } = storeToRefs(appStore.useSettingsStore)
</script>

<template>
	<ElConfigProvider
		:button="buttonConfig"
		:locale="currentEpLang"
		:size="sizeConfig"
		:z-index="zIndexConfig"
	>
		<RouterView #default="{ Component }">
			<component :is="Component" />
		</RouterView>
	</ElConfigProvider>
</template>

<style scoped></style>
