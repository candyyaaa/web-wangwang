<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-07 14:37:51
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-07 18:06:47
-->
<router lang="yaml">
name: pako
meta:
	layout: false
</router>

<script setup lang="ts">
import { unzip } from '@/utils'
console.log('unzip ----------->', unzip('H4SIAAAAAAAAAIUOBQADUBWNAGAAAA=='))
</script>

<template>
	<div class="pako-wrap" h-full w-full overflow-hidden>
		<h1>pako解压</h1>
	</div>
</template>

<style scoped></style>
