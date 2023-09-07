<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-21 21:19:10
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 17:55:32
-->
<route>
{
	name: "Index",
	meta: {
		layout: "index",
		title: "主页",
		roles: ["1"],
		icon: "i-carbon-home",
		hidden: false,
		ranking: 0
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

defineOptions({
	name: 'Index'
})
</script>

<style scoped></style>
