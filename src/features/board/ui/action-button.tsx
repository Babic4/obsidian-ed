import { Button } from '@/shared/ui/kit/button'

export function ActionButton({
	children,
	isActive,
	onClick,
}: {
	children: React.ReactNode
	isActive?: boolean
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
	return (
		<Button
			variant='ghost'
			size='icon'
			className={
				isActive
					? 'bg-(--primary) hover:bg-(--primary-hover) text-(--accent) hover:text-(--color-button-text)'
					: ''
			}
			onClick={onClick}
		>
			{children}
		</Button>
	)
}
