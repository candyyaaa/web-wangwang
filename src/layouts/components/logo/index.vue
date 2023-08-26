<!--
 * @Description: <logo>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-26 00:46:54
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-08-26 23:50:55
-->
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings-store'
import logoImg from '@/assets/images/logo.png'

type Props = {
	showLogo?: boolean
	showTitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	showLogo: true,
	showTitle: true
})

const settingsStore = useSettingsStore()

const title = ref(import.meta.env.VITE_APP_TITLE)

// logo 点击路由地址
const to = computed<{ name?: string | undefined }>(() => {
	const rtn: {
		name?: string
	} = {}
	if (settingsStore.home.enable) {
		rtn.name = 'index'
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
		:class="{ 'cursor-pointer': settingsStore.home.enable }"
		:title="title"
	>
		<img v-if="props.showLogo" :src="logoImg" alt="logo" h-12.5 w-12.5 object-contain />
		<span
			v-if="props.showTitle"
			ml-2.5
			block
			truncate
			text-2xl
			font-bold
			tracking-wide
			text-white
			>{{ title }}</span
		>
	</router-link>
</template>
