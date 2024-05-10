<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-06 14:07:18
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-03 00:42:34
-->
<route>
{
	"name": "RedirectPath",
	"meta": {
		"layout": "index",
		"title": "重定向",
		"constant": true,
		"hidden": true
	}
}
</route>

<script setup lang="ts">
import { isArray } from 'radash'

defineOptions({
	name: 'Redirect'
})

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
	const { params, query } = route
	const { path } = params

	router.replace({
		path: `/${isArray(path) ? path.join('/') : path}`,
		query: query
	})
})
</script>

<template>
	<el-empty />
</template>
