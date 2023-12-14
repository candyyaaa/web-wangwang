<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-07 11:15:58
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-12-14 19:59:26
-->
<route>
{
	name: "Login",
	meta: {
		layout: false,
		title: "登录",
		constant: true,
		hidden: true
	}
}
</route>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user-store'
import type { FormInstance, FormRules } from 'element-plus'

interface RegisterRuleForm {
	name: string
	password: string
	confirmPassword: string
}

interface LoginRuleForm {
	name: string
	password: string
	rememberPassword: boolean
}

defineOptions({
	name: 'Login'
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 按钮loading
const btnLoading = ref(false)
// 登录成功重定向
const redirect = ref(route.query.redirect?.toString() ?? '/')

// 注册表单
const registerFormRef = ref<FormInstance>()
const registerForm = reactive<RegisterRuleForm>({
	name: '',
	password: '',
	confirmPassword: ''
})
const registerRules = reactive<FormRules<RegisterRuleForm>>({
	name: [{ required: true, message: '请输入用户名！', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码！', trigger: 'blur' }],
	confirmPassword: [{ required: true, message: '请输入密码！', trigger: 'blur' }]
})

// 登录表单
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginRuleForm>({
	name: 'candy',
	password: '123456!',
	rememberPassword: false
})
const loginRules = reactive<FormRules<LoginRuleForm>>({
	name: [{ required: true, message: '请输入用户名！', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码！', trigger: 'blur' }]
})

// 切换控制 默认显示登录
const switchLoginController = ref(true)
const switchRegisterController = ref(false)

const onSubmitLogin = async () => {
	const query = {
		account: 'candy',
		// account: 'candy1',
		password: '123456!'
		// password: '123456!1'
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

const handleSwitch = (): void => {
	switchLoginController.value = !switchLoginController.value
	switchRegisterController.value = !switchRegisterController.value
}

const handleRegister = () => {
	console.log(registerForm)
}
</script>

<template>
	<div bg-login-bg h-full w-full flex items-center justify-center overflow-hidden text="#a0a5a8">
		<div
			class="login-center"
			relative
			shadow="[10px_10px_10px_#d1d9e6,-10px_-10px_10px_#f9f9f9]"
			h-136
			w-237.5
			overflow-hidden
			rounded-xl
			p-6
		>
			<!-- 注册 -->
			<!-- <div login-container right-0 z-0>
				<el-form
					ref="registerFormRef"
					:model="registerForm"
					:rules="registerRules"
					size="large"
					class="login-form"
				>
					<h2 class="text-[var(--el-text-color-primary)]" text="1.3em center" mb-7.5 font-bold>
						探索从这里开始！🚀
					</h2>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item prop="name">
								<el-input v-model="registerForm.name" placeholder="用户名" clearable>
									<template #prefix>
										<SvgIcon name="user" />
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item prop="password">
								<el-input v-model="registerForm.password" placeholder="密码" clearable>
									<template #prefix>
										<SvgIcon name="lock" />
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item prop="confirmPassword">
								<el-input v-model="registerForm.confirmPassword" placeholder="确认密码" clearable>
									<template #prefix>
										<SvgIcon name="lock" />
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item>
								<el-button round @click="handleRegister">注册</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div> -->

			<!-- 登录 -->
			<div login-container left-0 z-100>
				<el-form
					ref="loginFormRef"
					:model="loginForm"
					:rules="loginRules"
					size="large"
					class="login-form"
				>
					<h2 class="text-[var(--el-text-color-primary)]" text="1.3em center" mb-7.5 font-bold>
						欢迎来到 BirdTiny-admin ！👋🏻
					</h2>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item prop="name">
								<el-input v-model="loginForm.name" placeholder="用户名" clearable>
									<template #prefix>
										<SvgIcon name="user" />
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item prop="password">
								<el-input v-model="loginForm.password" placeholder="密码" clearable>
									<template #prefix>
										<SvgIcon name="lock" />
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row justify="center">
						<el-col :span="8">
							<el-checkbox v-model="loginForm.rememberPassword" label="记住密码" size="large" />
						</el-col>
						<el-col text-right :span="8">
							<el-link type="primary">忘记密码了？</el-link>
						</el-col>
					</el-row>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item>
								<el-button round @click="handleRegister">登录</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<!-- 切换 23.75rem-->
			<div
				w="2/5"
				shadow="[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#d1d9e6]"
				bg-login-bg
				animate-login-expand
				absolute
				right-0
				top-0
				z-200
				h-full
				flex
				items-center
				justify-center
				overflow-hidden
				p-12
				transition-all-1250
			>
				<div login-switch_circle></div>
				<div login-switch_circle login-switch_circle-t></div>

				<div
					:class="{ 'login-switch-hidden': switchRegisterController }"
					absolute
					w-95
					flex
					flex-col
					items-center
					justify-center
					p-13
				>
					<h2
						class="text-[var(--el-text-color-primary)]"
						text="1.3em center"
						mb-7.5
						font-bold
						tracking-normal
					>
						Hello Friend！
					</h2>
					<p tracking="[0.25px]" text-center text-sm leading-relaxed>
						去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！
					</p>
					<el-button round class="switch-btn" @click="handleSwitch">注册</el-button>
				</div>

				<div
					:class="{ 'login-switch-hidden': switchLoginController }"
					absolute
					w-95
					flex
					flex-col
					items-center
					justify-center
					p-13
				>
					<h2
						class="text-[var(--el-text-color-primary)]"
						text="1.3em center"
						mb-7.5
						font-bold
						tracking-normal
					>
						Welcome Back！
					</h2>
					<p tracking="[0.25px]" text-center text-sm leading-relaxed>
						已经有账号了嘛，去登入账号来进入奇妙世界吧！！！
					</p>
					<el-button round class="switch-btn" @click="handleSwitch">登录</el-button>
				</div>
			</div>
		</div>
		<h1>登录页面</h1>
		<!-- .625rem -->
		<el-button type="primary" :loading="btnLoading" @click="onSubmitLogin">登录</el-button>
	</div>
</template>

<style lang="scss" scoped></style>
