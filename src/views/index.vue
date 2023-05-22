<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:19:10
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-05-22 17:25:49
-->
<route>
{
	name: "name-override",
	meta: {
		layout: "index",
		title: "wangWang",
		requiresAuth: false
	}
}
</route>

<template>
	<div class="ml-12 mr-4 text-[#222]" p="x-2">
		<Home />
	</div>
</template>

<script setup lang="ts">
	const router = useRouter()
	const route = useRoute()
	console.log('router ----------->', router)
	console.log('route ----------->', route)
</script>

<style scoped></style>
