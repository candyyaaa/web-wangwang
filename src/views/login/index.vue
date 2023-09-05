<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-07 11:15:58
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-09-05 16:41:28
-->
<route>
{
	name: "Login",
	meta: {
		layout: false,
		title: "login",
		constant: true,
		hidden: true
	}
}
</route>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user-store'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 按钮loading
const btnLoading = ref(false)
// 登录成功重定向
const redirect = ref(route.query.redirect?.toString() ?? '/')

const onSubmitLogin = async () => {
	const query = {
		// account: 'candy',
		account: 'candy1',
		// password: '123456!'
		password: '123456!1'
	}

	btnLoading.value = true

	userStore
		.login(query)
		.then(result => {
			if (result.token) {
				router.push(redirect.value)
			}
		})
		.catch(err => {
			console.log('err ----------->', err)
		})
		.finally(() => {
			btnLoading.value = false
		})
}
</script>

<template>
	<div h-full w-full overflow-hidden>
		<h1>登录页面</h1>

		<el-button type="primary" :loading="btnLoading" @click="onSubmitLogin">登录</el-button>
	</div>
</template>

<style lang="scss" scoped></style>
