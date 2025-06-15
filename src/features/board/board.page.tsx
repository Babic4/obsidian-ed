import { Button } from '@/shared/ui/kit/button'
import { ArrowRightIcon, StickerIcon } from 'lucide-react'
import { useNodes } from './model/nodes'
import React, { type Ref } from 'react'
import { useCanvasRect } from './hooks/use-canvas-rect'
import { useLayoutFocus } from './hooks/use-layout-focus'
import { useViewModel } from './view-model/use-view-model'
import { useWindowEvents } from './hooks/use-window-events'
import type { Rect } from './domain/rect'
import clsx from 'clsx'

function BoardPage() {
	const nodesModel = useNodes()
	const focusLayoutRef = useLayoutFocus()
	const { canvasRef, canvasRect } = useCanvasRect()

	const viewModel = useViewModel({ nodesModel, canvasRect })

	useWindowEvents(viewModel)

	return (
		<Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
			<Dots />
			<Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
				<Overlay
					onClick={viewModel.overlay?.onClick}
					onMouseDown={viewModel.overlay?.onMouseDown}
					onMouseUp={viewModel.overlay?.onMouseUp}
				/>
				{viewModel.nodes.map(node => (
					<Sticker
						key={node.id}
						text={node.text}
						x={node.x}
						y={node.y}
						selected={node.isSelected}
						onClick={node.onClick}
					/>
				))}
			</Canvas>
			{viewModel.selectionWindow && (
				<SelectionWindow {...viewModel.selectionWindow} />
			)}
			<Actions>
				<ActionButton
					isActive={viewModel.actions?.addSticker?.isActive}
					onClick={viewModel.actions?.addSticker?.onClick}
				>
					<StickerIcon />
				</ActionButton>
				<ActionButton isActive={false} onClick={() => {}}>
					<ArrowRightIcon />
				</ActionButton>
			</Actions>
		</Layout>
	)
}

export const Component = BoardPage

function SelectionWindow({ height, width, x, y }: Rect) {
	return (
		<div
			className='absolute inset-0 bg-(--primary)/20 border-2 border-(--primary) rounded-[4px]'
			style={{ transform: `translate(${x}px, ${y}px)`, width, height }}
		></div>
	)
}

function Overlay({
	onClick,
	onMouseDown,
	onMouseUp,
}: {
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
	onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
	onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
}) {
	return (
		<div
			className='absolute inset-0'
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		></div>
	)
}

function Layout({
	children,
	ref,
	...props
}: {
	children: React.ReactNode
	ref: Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className='grow relative' tabIndex={0} ref={ref} {...props}>
			{children}
		</div>
	)
}

function Dots() {
	return (
		<div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'></div>
	)
}

function Canvas({
	children,
	ref,
	...props
}: {
	children: React.ReactNode
	ref: Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div ref={ref} {...props} className='absolute inset-0'>
			{children}
		</div>
	)
}

function Sticker({
	text,
	x,
	y,
	onClick,
	selected,
}: {
	text: string
	x: number
	y: number
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	selected?: boolean
}) {
	return (
		<button
			className={clsx(
				'absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md',
				selected && 'outline outline-2 outline-(--primary)'
			)}
			style={{ transform: `translate(${x}px, ${y}px)` }}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

function Actions({ children }: { children: React.ReactNode }) {
	return (
		<div className='absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white p-1 rounded-md shadow'>
			{children}
		</div>
	)
}

function ActionButton({
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
