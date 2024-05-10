<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:19:10
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-10 19:31:31
-->
<route>
{
	name: "Index",
	meta: {
		layout: "index",
		title: "主页",
		roles: ["admin"],
		icon: "i-carbon-home",
		hidden: false,
		sort: 0,
		affix: true
	}
}
</route>

<template>
	<div class="ml-12 mr-4 text-[#222]" p="x-2" h-full>
		<Home />
	</div>
</template>

<script setup lang="ts">
// const router = useRouter()
// const route = useRoute()
// console.log('router ----------->', router)
// console.log('route ----------->', route)

import { routes } from 'vue-router/auto-routes'
console.log('routes', routes)

defineOptions({
	name: 'Index'
})
</script>

<style scoped></style>
