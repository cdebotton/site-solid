import { cx, cva, VariantProps } from 'class-variance-authority';
import { type JSX } from 'solid-js';

let buttonStyles = cva('tracking-tighter', {
	variants: {
		variant: {
			primary:
				'vapor:bg-plum-dark-3 vapor:text-plum-dark-11 eva:bg-red-9 eva:text-red-2',
			secondary: '',
		},
		size: {
			lg: '',
			md: 'px-3 py-2 font-extrabold text-sm',
			sm: '',
		},
		disabled: {
			true: '',
		},
		outline: {
			true: '',
		},
	},
	defaultVariants: {
		variant: 'primary',
		disabled: false,
		outline: false,
		size: 'md',
	},
	compoundVariants: [],
});

export default function Button(
	props: {
		children?: JSX.Element;
		class?: string;
		type?: HTMLButtonElement['type'];
		onClick?: (
			_event: MouseEvent & {
				currentTarget: HTMLButtonElement;
				target: Element;
			},
		) => void;
	} & VariantProps<typeof buttonStyles>,
) {
	return (
		<button
			onClick={(evt) => props.onClick?.(evt)}
			disabled={props.disabled ?? undefined}
			class={cx(
				buttonStyles({
					variant: props.variant,
					disabled: props.disabled,
					size: props.size,
					outline: props.outline,
				}),
				props.class,
			)}
		>
			{props.children}
		</button>
	);
}
