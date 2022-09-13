import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { forwardRef } from 'react';

const styles = cva(
	[
		'border',
		'shadow-sm',
		'rounded-md',
		'items-center',
		'disabled:opacity-50',
		'transition-colors duration-100',
		'cursor-default disabled:cursor-not-allowed'
	],
	{
		variants: {
			variant: {
				primary: [
					'text-white',
					'bg-primary-600 hover:bg-primary active:bg-primary-600',
					'border-primary-500 hover:border-primary-500 active:border-primary-700'
				],
				secondary: [
					'dark:active:opacity-80',
					'bg-gray-50 hover:bg-gray-100 active:bg-gray-50',
					'dark:bg-transparent dark:hover:bg-gray-550 dark:active:bg-gray-600 ',
					'border-gray-100 hover:border-gray-200 active:border-gray-200',
					'dark:border-transparent dark:hover:border-gray-500 dark:active:border-gray-600',
					'text-gray-700 hover:text-gray-900 active:text-gray-600',
					'dark:text-gray-200 dark:hover:text-white dark:active:text-white'
				],
				gray: [
					'dark:active:opacity-80',
					'bg-gray-100 hover:bg-gray-200 active:bg-gray-100',
					'dark:bg-gray-500 dark:hover:bg-gray-500',
					'dark:bg-opacity-80 dark:hover:bg-opacity-100',
					'border-gray-200 hover:border-gray-300 active:border-gray-200',
					'dark:border-gray-500 dark:hover:border-gray-500',
					'text-gray-700 hover:text-gray-900 active:text-gray-600',
					'dark:text-gray-200 dark:active:text-white dark:hover:text-white'
				],
				colored: ['text-white', 'hover:bg-opacity-90 active:bg-opacity-100'],
				selected: [
					'bg-gray-100 dark:bg-gray-500',
					'text-black hover:text-black active:text-black',
					'dark:text-white dark:hover:text-white'
				]
			},
			size: {
				md: ['py-1 px-3 text-md font-medium'],
				sm: ['py-1 px-2 text-sm font-medium']
			}
		},
		defaultVariants: {
			variant: 'gray',
			size: 'md'
		}
	}
);

export interface ButtonBaseProps extends VariantProps<typeof styles> {
	loading?: boolean;
	icon?: React.ReactNode;
	noPadding?: boolean;
	noBorder?: boolean;
	pressEffect?: boolean;
	justifyLeft?: boolean;
}

export type ButtonProps = ButtonBaseProps &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		href?: undefined;
	};

export type LinkButtonProps = ButtonBaseProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		href?: string;
	};

type Button = {
	(props: ButtonProps): JSX.Element;
	(props: LinkButtonProps): JSX.Element;
};

const hasHref = (props: ButtonProps | LinkButtonProps): props is LinkButtonProps => 'href' in props;

export const Button = forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps | LinkButtonProps
>(({ loading, justifyLeft, className, pressEffect, noBorder, noPadding, ...props }, ref) => {
	className = clsx(
		{ 'opacity-70': loading, '!p-1': noPadding },
		{ 'justify-center': !justifyLeft },
		{ 'active:translate-y-[1px]': pressEffect },
		{ 'border-0': noBorder },
		styles(props),
		className
	);

	return hasHref(props) ? (
		<a {...props} ref={ref as any} className={clsx(className, 'no-underline')}>
			<>
				{props.icon}
				{props.children}
			</>
		</a>
	) : (
		<button {...(props as ButtonProps)} ref={ref as any} className={className}>
			<>
				{props.icon}
				{props.children}
			</>
		</button>
	);
});
