<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-09-06 14:07:18
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-07 15:10:33
-->
<route>
{
	"name": "Redirect",
	"meta": {
		"layout": "index",
		"title": "重定向",
		"constant": true,
		"hidden": true
	}
}
</route>

<script setup lang="ts">
import isArray from 'lodash-es/isArray'

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
