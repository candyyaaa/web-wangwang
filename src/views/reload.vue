<!--
 * @Description: <reload>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-23 17:51:23
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-23 17:54:52
-->
<route>
	{
		name: "reload",
		meta: {
			layout: false
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
