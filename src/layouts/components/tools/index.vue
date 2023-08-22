<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-29 00:31:35
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-22 16:19:46
-->
<script setup lang="ts">
const { t } = useI18n()

// 消息tab切换
const activeName = ref('first')

/**
 * @description: 点击搜索
 */
const onSearch = (): void => {
	console.log('onSearch ----------->')
}

/**
 * @description: 消息tab点击切换
 */
const handleTabClick = (): void => {
	console.log('handleTabClick ----------->')
}
</script>

<template>
	<div flex items-center whitespace-nowrap px-0 py-5>
		<!-- 搜索 -->
		<el-space size="large">
			<button icon-btn :title="t('button.search')" @click="onSearch">
				<div i-carbon-search text-lg></div>
			</button>
		</el-space>

		<!-- 消息/代办 -->
		<el-space size="large">
			<el-popover
				trigger="hover"
				placement="bottom"
				width="350px"
				popper-class="notification-popover"
			>
				<template #reference>
					<el-badge :value="9" type="primary">
						<button icon-btn>
							<div i-carbon-notification-new text-lg></div>
						</button>
					</el-badge>
				</template>

				<el-tabs v-model="activeName" class="notification-tabs" @tab-click="handleTabClick">
					<el-tab-pane label="消息" name="first">
						<el-scrollbar max-height="350px">
							<div
								class="border-[var(--el-border-color)]"
								flex
								p="y-3.5 x-2.5"
								border="b"
								transition-all
								duration-300
							>
								<div bg="#409EFF" rounded="1/2" h-7 w-7 flex items-center justify-center text-white>
									<div i-carbon-email-new text-lg />
								</div>
								<div class="info">
									<div class="info-title"></div>
									<div class="info-date"></div>
								</div>
							</div>
						</el-scrollbar>
					</el-tab-pane>
					<el-tab-pane label="代办" name="second">Config</el-tab-pane>
				</el-tabs>
			</el-popover>
		</el-space>

		<el-space size="large">
			<el-tooltip effect="dark" placement="bottom">
				<template #default>
					<span i-ant-design:fullscreen-outlined cursor-pointer text-lg></span>
				</template>
				<template #content>
					<span>全屏</span>
				</template>
			</el-tooltip>
		</el-space>

		<el-space size="large">
			<el-tooltip effect="dark" placement="bottom">
				<template #default>
					<span i-ant-design:fullscreen-exit-outlined cursor-pointer text-lg></span>
				</template>
				<template #content>
					<span>默认</span>
				</template>
			</el-tooltip>
		</el-space>

		<el-space size="large">
			<el-tooltip effect="dark" placement="bottom">
				<template #default>
					<span i-ant-design:sync-outlined cursor-pointer text-lg></span>
				</template>
				<template #content>
					<span>刷新</span>
				</template>
			</el-tooltip>
		</el-space>
		<el-space size="large">
			<span i-ep:search></span>
		</el-space>
		<el-space size="large">
			<span i-ep:search></span>
		</el-space>
	</div>
</template>

<style scoped></style>
