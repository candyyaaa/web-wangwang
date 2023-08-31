<!--
 * @Description: <>
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-05-29 00:31:35
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-31 11:32:18
-->
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user-store'
import { useSettingsStore } from '@/store/modules/settings-store'
import { loadLanguageAsync } from '@/i18n'

// 路由
const router = useRouter()

// 用户信息状态
const userStore = useUserStore()

// 系统设置状态
const settingsStore = useSettingsStore()

// 全屏hook
const { isFullscreen, toggle: onFullscreenToggle } = useFullscreen()

// 深色模式hook
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 国际化
const { t, locale } = useI18n()

// 消息tab切换
const activeName = ref('first')

const toggleLangsList = [
	{
		label: '中文(简体)',
		key: 'zh-CN'
	},
	{
		label: '中文(繁体)',
		key: 'zh-TW'
	},
	{
		label: 'English',
		key: 'en'
	}
]

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

/**
 * @description: 国际化下拉点击切换触发
 * @param {string} command 当前选中的语言
 */
const handleCommand = async (command: string): Promise<void> => {
	// 更新状态
	settingsStore.setLang(command)

	// 更新国际化
	await loadLanguageAsync(command)
	locale.value = command
}

/**
 * @description: 页面刷新
 */
const onRefresh = (): void => {
	router.push({
		name: 'reload'
	})
}

/**
 * @description: 用户下拉
 */
const onUserCommand = (): void => {
	console.log('onUserCommand ----------->')
}
</script>

<template>
	<div flex items-center whitespace-nowrap px-0 py-5 text-white>
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
								b
								transition-all
								duration-300
							>
								<div
									class="bg-[var(--el-color-primary)]"
									rounded="1/2"
									h-7
									w-7
									flex
									items-center
									justify-center
									text-white
								>
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

		<!-- 语言切换 -->
		<el-space size="large">
			<el-dropdown @command="handleCommand" text="[white_!important]">
				<button icon-btn :title="t('button.toggle_langs')" @click="onSearch">
					<div i-carbon-language text-lg></div>
				</button>

				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item
							v-for="item in toggleLangsList"
							:key="item.key"
							:command="item.key"
							:disabled="settingsStore.currentLang === item.key"
						>
							{{ item.label }}
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</el-space>

		<!-- 全屏切换 -->
		<el-space size="large">
			<button icon-btn :title="t('button.toggle_screen')" @click="onFullscreenToggle">
				<div :i="isFullscreen ? 'carbon-screen' : 'carbon-fit-to-screen'" text-lg></div>
			</button>
		</el-space>

		<!-- 刷新页面 -->
		<el-space size="large">
			<button icon-btn :title="t('button.refresh')" @click="onRefresh">
				<div i-carbon-renew text-lg></div>
			</button>
		</el-space>

		<!-- 浅/深色切换 -->
		<el-space size="large">
			<button icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
				<div i="carbon-sun dark:carbon-moon" text-lg></div>
			</button>
		</el-space>

		<el-dropdown size="default" @command="onUserCommand" text="[white_!important]">
			<div flex items-center text-base>
				<el-avatar size="small" mr-2>
					<div i-carbon-user-filled text-lg></div>
				</el-avatar>
				{{ userStore.name }}
				<i i-carbon-caret-down ml-1 inline-block text-lg></i>
			</div>

			<template #dropdown>
				<el-dropdown-menu class="user-dropdown">
					<el-dropdown-item v-if="settingsStore.home.enable" command="home">
						{{ settingsStore.home.title }}
					</el-dropdown-item>
					<el-dropdown-item command="setting"> 个人设置 </el-dropdown-item>
					<el-dropdown-item divided command="logout"> 退出登录 </el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>
