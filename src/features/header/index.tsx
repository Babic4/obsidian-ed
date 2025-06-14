import { useSession } from '@/shared/model/session'
import { Button } from '@/shared/ui/kit/button'

export function AppHeader() {
	const { session, logout } = useSession()

	if (!session) return null

	return (
		<header className='bg-(--color-card-bg) border-b border-border/10 shadow-sm py-3 px-4'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				<div className='text-xl font-semibold'>Obsidian</div>

				<div className='flex items-center gap-4'>
					<span className='text-sm text-muted-foreground'>{session.email}</span>
					<Button
						variant='outline'
						size='sm'
						onClick={() => logout()}
						className='hover:bg-(--color-error)/10 hover:border-(--color-error)/50'
					>
						Выйти
					</Button>
				</div>
			</div>
		</header>
	)
}
