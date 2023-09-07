<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-06 00:55:01
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-06 01:02:25
-->
<script setup lang="ts">
defineOptions({
	name: 'notFound'
})
const { t } = useI18n()
</script>

<template>
	<div>
		{{ t('not-found') }}
	</div>
</template>

<route>
{
	name: "notFound",
	meta: {
		layout: "404",
		constant: true,
		hidden: true
	}
}
</route>
