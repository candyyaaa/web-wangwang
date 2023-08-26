<!--
 * @Description: <页面重定向>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-08-27 00:32:55
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-08-27 01:40:59
-->
<route>
{
	name: "redirect",
	meta: {
		layout: false
	}
}
</route>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
	const { params, query } = route
	const { path } = params

	router.replace({
		path: '/' + (Array.isArray(path) ? path.join('/') : path),
		query
	})
})
</script>

<template>
	<div h-full w-full>
		<el-empty />
	</div>
</template>
