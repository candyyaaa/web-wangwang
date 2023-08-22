/*
 * @Description: <国际化>
 * @Author: menggt littlecandyi@163.com
 * @Date: 2023-08-22 11:32:38
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-08-22 11:41:31
 */
import { createI18n } from 'vue-i18n'
import type { Locale } from 'vue-i18n'
import type { App } from 'vue'

// 导入i18n资源
// https://vitejs.dev/guide/features.html#glob-import

const i18n = createI18n({
	legacy: false,
	locale: '',
	messages: {}
})

const localesMap = Object.fromEntries(
	Object.entries(import.meta.glob('../../locales/*.yml')).map(([path, loadLocale]) => [
		path.match(/([\w-]*)\.yml$/)?.[1],
		loadLocale
	])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

const loadedLanguages: string[] = []

const setI18nLanguage = (lang: Locale): string => {
	i18n.global.locale.value = lang
	if (typeof document !== 'undefined') {
		document.querySelector('html')?.setAttribute('lang', lang)
	}

	return lang
}

const loadLanguageAsync = async (lang: string): Promise<Locale> => {
	// 如果是同一种语言
	if (i18n.global.locale.value === lang) {
		return setI18nLanguage(lang)
	}

	// 如果语言已经加载
	if (loadedLanguages.includes(lang)) {
		return setI18nLanguage(lang)
	}

	// 如果语言还没有加载
	const messages = await localesMap[lang]()
	i18n.global.setLocaleMessage(lang, messages.default)
	loadedLanguages.push(lang)

	return setI18nLanguage(lang)
}

export const availableLocales = Object.keys(localesMap)

export const initLang = (app: App): void => {
	app.use(i18n)
	loadLanguageAsync('zh-CN')
}
