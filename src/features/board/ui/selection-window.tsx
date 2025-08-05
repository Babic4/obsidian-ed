import type { Rect } from '../domain/rect'

export function SelectionWindow({ height, width, x, y }: Rect) {
	return (
		<div
			className='absolute inset-0 bg-(--primary)/20 border-2 border-(--primary) rounded-[4px]'
			style={{ transform: `translate(${x}px, ${y}px)`, width, height }}
		></div>
	)
}
