<!--
 * @Description:
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2024-05-10 19:21:44
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-10 19:36:23
-->

<route>
{
	"name": "Demo",
	"meta": {
		"constant": false,
		"icon": "i-carbon-demo",
		"layout": "index",
		"roles": ["admin"],
		"sort": 3,
		"title": "演示"
	}
}
</route>

<script setup lang="ts"></script>

<template>
	<div h-full w-full>
		<RouterView />
	</div>
</template>
