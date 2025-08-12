import { type Selection } from '../../../domain/selection'
import type { ViewModelParams } from '../../view-model-params'
import type { ViewModel } from '../../view-model-type'
import { useSelection } from './use-selection'
import { useDeleteSelected } from './use-delete-selected'
import { useGoToEditSticker } from './use-go-to-edit-sticker'
import { useGoToAddSticker } from './use-go-to-add-sticker'
import { useMouseDown } from './use-mouse-down'
import { useGoToSelectionWindow } from './use-go-to-selection-window'
import { useGoToNodesDragging } from './use-go-to-nodes-dragging'

export type IdleViewState = {
	type: 'idle'
	selectedIds: Set<string>
	mouseDown?:
		| {
				type: 'overlay'
				x: number
				y: number
		  }
		| {
				type: 'node'
				x: number
				y: number
				nodeId: string
		  }
}

export function useIdleViewModel(params: ViewModelParams) {
	const { nodesModel } = params

	const deleteSelected = useDeleteSelected(params)
	const goToAddSticker = useGoToAddSticker(params)
	const goToEditSticker = useGoToEditSticker(params)
	const goToSelectionWindow = useGoToSelectionWindow(params)
	const goToNodesDragging = useGoToNodesDragging(params)
	const mouseDown = useMouseDown(params)
	const selection = useSelection(params)

	return (idleState: IdleViewState): ViewModel => ({
		nodes: nodesModel.nodes.map(node => ({
			...node,
			isSelected: selection.isSelected(idleState, node.id),
			onMouseDown: e => mouseDown.handleNodeMouseDown(idleState, node.id, e),
			onMouseUp: e => {
				if (!mouseDown.getIsStickerMouseDown(idleState, node.id)) return
				const clickResult = goToEditSticker.handleNodeClick(
					idleState,
					node.id,
					e
				)
				if (clickResult.preventNext) return
				selection.handleNodeClick(idleState, node.id, e)
			},
		})),
		layout: {
			onKeyDown: e => {
				goToAddSticker.handleKeyDown(e)
				deleteSelected.handleKeyDown(idleState, e)
			},
		},
		overlay: {
			onMouseDown: e => mouseDown.handelOverlayMouseDown(idleState, e),
			onMouseUp: () => selection.handelOverlayMouseUp(idleState),
		},
		window: {
			onMouseUp: () => mouseDown.handelWindowMouseUp(idleState),
			onMouseMove: e => {
				goToNodesDragging.handleWindowMouseMove(idleState, e)
				goToSelectionWindow.handleWindowMouseMove(idleState, e)
			},
		},
		actions: {
			addSticker: {
				isActive: false,
				onClick: goToAddSticker.handleActionClick,
			},
		},
	})
}

export function goToIdle({
	selectedIds,
}: {
	selectedIds?: Selection
} = {}): IdleViewState {
	return {
		type: 'idle',
		selectedIds: selectedIds ?? new Set(),
	}
}
