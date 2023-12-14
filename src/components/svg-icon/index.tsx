/*
 * @Description:
 * @Author: smellycat littlecandyi@163.com
 * @Date: 2023-12-12 21:48:11
 * @LastEditors: smellycat littlecandyi@163.com
 * @LastEditTime: 2023-12-12 22:32:39
 */
interface Props {
	name: string
	color?: string
	className?: string
	prefix?: string
}

export default defineComponent({
	name: 'SvgIcon',
	props: {
		name: {
			type: String as PropType<Props['name']>,
			default: undefined
		},
		color: {
			type: String as PropType<Props['color']>,
			default: undefined
		},
		className: {
			type: String as PropType<Props['className']>,
			default: 'svg-icon'
		},
		prefix: {
			type: String as PropType<Props['prefix']>,
			default: 'icon'
		}
	},
	setup(props) {
		const symbolId = computed(() => `#${props.prefix}-${props.name}`)
		const svgClass = computed(() => props.className)

		return () => (
			<svg class={`${svgClass.value} h-1.2em w-1.2em`} fill-current aria-hidden='false'>
				<use xlinkHref={symbolId.value} fill={props.color} />
			</svg>
		)
	}
})
