<!--
 * @Description: <logo>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-26 00:46:54
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 15:38:02
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import logoImg from '@/assets/images/logo.png'

type Props = {
	showLogo?: boolean
	showTitle?: boolean
	sidebarLogo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	showLogo: true,
	showTitle: true,
	sidebarLogo: false
})

const settingsStore = useSettingsStore()

const title = ref(import.meta.env.VITE_APP_TITLE)

// logo 点击路由地址
const to = computed<{ name?: string | undefined }>(() => {
	const rtn: {
		name?: string
	} = {}
	if (settingsStore.home.enable) {
		rtn.name = 'Index'
	}
	return rtn
})
</script>

<template>
	<router-link
		:to="to"
		relative
		top-0
		z-1000
		h-inherit
		w-inherit
		flex
		items-center
		justify-center
		bg-inherit
		text-2xl
		:class="{ 'cursor-pointer': settingsStore.home.enable }"
		:title="title"
	>
		<img
			v-if="props.showLogo"
			:src="logoImg"
			alt="logo"
			class="logo-img"
			:h="props.sidebarLogo ? '7.5' : '12.5'"
			:w="props.sidebarLogo ? '7.5' : '12.5'"
			object-contain
		/>
		<span
			v-if="props.showTitle"
			class="logo-title"
			:ml="props.showLogo && '2.5'"
			block
			truncate
			font-bold
			tracking-wide
			text-inherit
			>{{ title }}</span
		>
	</router-link>
</template>
