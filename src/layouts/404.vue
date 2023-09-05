<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-09-06 00:58:16
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-09-06 00:59:30
-->
<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
	<main p="x4 y10" text="center teal-700 dark:gray-200">
		<div text-4xl>
			<div i-carbon-warning inline-block />
		</div>
		<RouterView />
		<div>
			<button btn text-sm m="3 t8" @click="router.back()">
				{{ t('button.back') }}
			</button>
		</div>
	</main>
</template>
