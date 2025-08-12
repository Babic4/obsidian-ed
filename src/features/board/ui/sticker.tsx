import clsx from 'clsx'
import React, { type Ref, useState, useLayoutEffect, useRef } from 'react'

export function Sticker({
	id,
	ref,
	text,
	x,
	y,
	onClick,
	isSelected,
	isEditing,
	onTextChange,
	onMouseDown,
	onMouseUp,
}: {
	id: string
	ref: Ref<HTMLButtonElement>
	text: string
	x: number
	y: number
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	isSelected?: boolean
	isEditing?: boolean
	onTextChange?: (text: string) => void
	onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void
	onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
	return (
		<button
			data-id={id}
			ref={ref}
			className={clsx(
				'absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md text-left',
				isSelected && 'outline outline-2 outline-(--primary)'
			)}
			style={{ transform: `translate(${x}px, ${y}px)` }}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			<TextareaAutoSize
				isEditing={isEditing ?? false}
				value={text}
				onChange={value => onTextChange?.(value)}
			/>
		</button>
	)
}

function TextareaAutoSize({
	isEditing,
	value,
	onChange,
}: {
	isEditing: boolean
	value: string
	onChange?: (value: string) => void
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(0)
	const [width, setWidth] = useState(0)

	useLayoutEffect(() => {
		if (!ref.current) return

		const { scrollWidth, scrollHeight } = ref.current
		setHeight(scrollHeight)
		setWidth(scrollWidth)
	}, [value])

	return (
		<div className='relative'>
			<div
				ref={ref}
				className={clsx('whitespace-pre-wrap', isEditing && 'opacity-0')}
			>
				{value}
			</div>
			{isEditing && (
				<textarea
					className='absolute inset-0 left-0 top-0 resize-none overflow-hidden focus:outline-none'
					autoFocus
					style={{
						width: width + 2,
						height: height + 2,
					}}
					value={value}
					onChange={e => onChange?.(e.target.value)}
				/>
			)}
		</div>
	)
}
