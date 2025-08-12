import { type Selection } from '../../../domain/selection'
import type { ViewModelParams } from '../../view-model-params'
import type { ViewModel } from '../../view-model-type'
import { useSelection } from './use-selection'
import { useDeleteSelected } from './use-delete-selected'
import { useGoToEditSticker } from './use-go-to-edit-sticker'
import { useGoToAddSticker } from './use-go-to-add-sticker'
import { useMouseDown } from './use-mouse-down'
import { useGoToSelectionWindow } from './use-go-to-selection-window'

export type IdleViewState = {
	type: 'idle'
	selectedIds: Set<string>
	mouseDown?: {
		x: number
		y: number
	}
}

export function useIdleViewModel(params: ViewModelParams) {
	const { nodesModel } = params

	const deleteSelected = useDeleteSelected(params)
	const goToAddSticker = useGoToAddSticker(params)
	const goToEditSticker = useGoToEditSticker(params)
	const goToSelectionWindow = useGoToSelectionWindow(params)
	const mouseDown = useMouseDown(params)
	const selection = useSelection(params)

	return (idleState: IdleViewState): ViewModel => ({
		nodes: nodesModel.nodes.map(node => ({
			...node,
			isSelected: selection.isSelected(idleState, node.id),
			onClick: e => {
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
				const keyDownResult = goToEditSticker.handleKeyDown(idleState, e)
				if (keyDownResult.preventNext) return

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
			onMouseMove: e => goToSelectionWindow.handleWindowMouseMove(idleState, e),
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
