import { useState } from 'react'

type NodeBase = {
	id: string
	type: string
}

type StickerNode = NodeBase & {
	type: 'stickers'
	text: string
	x: number
	y: number
}

type Node = StickerNode

export function useNodes() {
	const [nodes, setNodes] = useState<Node[]>([
		{
			id: '1',
			type: 'stickers',
			text: 'Hello 1',
			x: 100,
			y: 100,
		},
		{
			id: '2',
			type: 'stickers',
			text: 'Hello 2',
			x: 200,
			y: 200,
		},
	])

	const addSticker = (data: { text: string; x: number; y: number }) => {
		setNodes(prev => {
			return [
				...prev,
				{
					id: crypto.randomUUID(),
					type: 'stickers',
					...data,
				},
			]
		})
	}

	return {
		nodes,
		addSticker,
	}
}

export type NodesModel = ReturnType<typeof useNodes>
