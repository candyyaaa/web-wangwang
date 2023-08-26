<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:19:10
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-08-26 21:45:27
-->
<route>
{
	name: "index",
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
