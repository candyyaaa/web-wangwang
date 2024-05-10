<!--
 * @Description: <>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-07 11:15:58
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2024-05-06 00:06:11
-->
<route>
	{
		name: "Login",
		meta: {
			constant: true,
			hidden: true,
			layout: false,
			title: "登录",
		}
	}
	</route>

<script setup lang="ts">
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
const { handleLogin } = appStore.useUserStore

// 按钮loading
const loginBtnLoading = ref(false)
const registerBtnLoading = ref(false)
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
	// name: '',
	name: 'candy',
	// password: '',
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
// 切换框缩放控制
const switchExpandController = ref(false)
// 控制移动
const switchMoveController = ref(false)
// 登录注册表单移动控制
const containerMoveController = ref(false)
// 密码可见控制
const loginPasswordInvisible = ref(false)
const registerPasswordInvisible = ref(false)
const registerConfirmPasswordInvisible = ref(false)
// 动态获取宽度
const loginSwitch = ref<HTMLDivElement | null>(null)
const loginSwitchOffsetWidth = ref<number>(0)

onMounted(() => {
	loginSwitchOffsetWidth.value = loginSwitch.value?.offsetWidth ?? 0
})

const onSubmitLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) {
		return
	}

	await formEl.validate(valid => {
		if (valid) {
			const query = {
				account: loginForm.name,
				password: loginForm.password
			}

			loginBtnLoading.value = true

			handleLogin(query)
				.then(result => {
					if (result.data.token) {
						router.push(redirect.value)
					}
				})
				.catch(err => {
					console.log('err ----------->', err)
				})
				.finally(() => {
					loginBtnLoading.value = false
				})
		}
	})
}

const onSubmitRegister = async (formEl: FormInstance | undefined) => {
	if (!formEl) {
		return
	}

	formEl.validate(valid => {
		if (valid) {
			const query = {
				account: registerForm.name,
				password: registerForm.password
			}

			console.log(query)
		}
	})
}

const handleSwitch = (): void => {
	if (!registerFormRef.value) {
		return
	}

	if (!loginFormRef.value) {
		return
	}

	// 优先切换框缩放
	switchExpandController.value = true
	setTimeout(() => {
		// 删除类名
		switchExpandController.value = false
	}, 1500)

	// 移动
	switchMoveController.value = !switchMoveController.value

	// 切换显示控制
	switchLoginController.value = !switchLoginController.value
	switchRegisterController.value = !switchRegisterController.value

	// 表单移动
	containerMoveController.value = !containerMoveController.value

	// 清空表单数据
	clearFormDate()
}

const handlePasswordIcon = (key: number, val: boolean): void => {
	switch (key) {
		case 1:
			loginPasswordInvisible.value = !val
			break
		case 2:
			registerPasswordInvisible.value = !val
			break
		case 3:
			registerConfirmPasswordInvisible.value = !val
			break
	}
}

const clearFormDate = (): void => {
	loginForm.name = ''
	loginForm.password = ''
	loginForm.rememberPassword = false

	registerForm.name = ''
	registerForm.password = ''
	registerForm.confirmPassword = ''

	loginPasswordInvisible.value = false
	registerPasswordInvisible.value = false
	registerConfirmPasswordInvisible.value = false

	registerFormRef.value?.resetFields()
	loginFormRef.value?.resetFields()
}
</script>

<template>
	<div h-full w-full flex items-center justify-center overflow-hidden bg-login-bg text="#a0a5a8">
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
			<div
				:class="{ 'left-2/5': containerMoveController, 'z-200': containerMoveController }"
				login-container
				left-0
				z-0
			>
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
									<template #suffix>
										<SvgIcon
											class="icon-btn hover:text-#a0a5a8"
											v-show="registerForm.password"
											:name="registerPasswordInvisible ? 'eye' : 'eye-invisible'"
											@click="handlePasswordIcon(2, registerPasswordInvisible)"
										/>
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
									<template #suffix>
										<SvgIcon
											class="icon-btn hover:text-#a0a5a8"
											v-show="registerForm.confirmPassword"
											:name="registerConfirmPasswordInvisible ? 'eye' : 'eye-invisible'"
											@click="handlePasswordIcon(3, registerConfirmPasswordInvisible)"
										/>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row justify="center">
						<el-col :span="16">
							<el-form-item>
								<el-button
									round
									:loading="registerBtnLoading"
									@click="onSubmitRegister(registerFormRef)"
									>注册</el-button
								>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<!-- 登录 -->
			<div :class="{ 'left-2/5': containerMoveController }" login-container left-0 z-100>
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
								<el-input
									v-model="loginForm.password"
									:type="loginPasswordInvisible ? 'text' : 'password'"
									placeholder="密码"
								>
									<template #prefix>
										<SvgIcon name="lock" />
									</template>
									<template #suffix>
										<SvgIcon
											class="icon-btn hover:text-#a0a5a8"
											v-show="loginForm.password"
											:name="loginPasswordInvisible ? 'eye' : 'eye-invisible'"
											@click="handlePasswordIcon(1, loginPasswordInvisible)"
										/>
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
								<el-button round :loading="loginBtnLoading" @click="onSubmitLogin(loginFormRef)"
									>登录</el-button
								>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<!-- 切换 -->
			<div
				ref="loginSwitch"
				:class="{
					'left-[calc(100%-40%)]': true,
					'animate-login-expand': switchExpandController,
					'left-0': switchMoveController
				}"
				w="2/5"
				shadow="[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#d1d9e6]"
				absolute
				top-0
				z-200
				h-full
				flex
				items-center
				justify-center
				overflow-hidden
				bg-login-bg
				p-12
				transition-all-1250
			>
				<!-- 顶部圆圈 -->
				<div
					login-switch_circle
					login-switch_circle-t
					:class="{ 'left-2/5': switchMoveController }"
					:style="{ height: `calc(${loginSwitchOffsetWidth}px*0.75)` }"
				></div>
				<!-- 底部部圆圈 -->
				<div
					login-switch_circle
					:class="{ '-left-3/5': switchMoveController }"
					:style="{ height: `calc(${loginSwitchOffsetWidth}px*1.25)` }"
				></div>

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
	</div>
</template>
