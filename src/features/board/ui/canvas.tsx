import React from 'react'
import type { Ref } from 'react'
import type { WindowPosition } from '../model/window-position'

export function Canvas({
	windowPosition,
	children,
	ref,
	overlay,
	...props
}: {
	windowPosition: WindowPosition
	children: React.ReactNode
	ref: Ref<HTMLDivElement>
	overlay?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			ref={ref}
			{...props}
			onContextMenu={e => e.preventDefault()}
			className='absolute inset-0 select-none overflow-hidden'
		>
			{overlay}
			<div
				style={{
					transform: `translate(${windowPosition.x}px, ${windowPosition.y}px) scale(${windowPosition.zoom})`,
				}}
			>
				{children}
			</div>
		</div>
	)
}
