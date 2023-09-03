<!--
 * @Description: <reload>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-23 17:51:23
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-03 03:13:47
-->
<route>
	{
		name: "reload",
		meta: {
			layout: false,
			constant: true,
			hidden: true
		}
	}
	</route>

<script setup lang="ts">
const router = useRouter()

onMounted(() => {
	router.go(-1)
})
</script>

<template>
	<div />
</template>
