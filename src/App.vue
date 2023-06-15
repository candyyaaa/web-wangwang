<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 00:20:17
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-06-15 15:59:20
-->
<script setup lang="ts">
import { localeConfig, sizeConfig, zIndexConfig, buttonConfig } from '@/config/element-config'
</script>

<template>
	<ElConfigProvider
		:locale="localeConfig"
		:size="sizeConfig"
		:z-index="zIndexConfig"
		:button="buttonConfig"
	>
		<RouterView #default="{ Component }">
			<component :is="Component" />
		</RouterView>
	</ElConfigProvider>
</template>

<style scoped></style>
