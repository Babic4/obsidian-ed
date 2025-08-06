import { type Selection } from '../../../domain/selection'
import type { ViewModelParams } from '../../view-model-params'
import type { ViewModel } from '../../view-model-type'
import { distanceFromPoints } from '../../../domain/point'
import { goToSelectionWindow } from '../selection-window'
import { pointOnScreenToCanvas } from '../../../domain/screen-to-canvas'
import { useSelection } from './use-selection'
import { useDeleteSelected } from './useDeleteSelected'
import { useGoToEditSticker } from './useGoToEditSticker'
import { useGoToAddSticker } from './useGoToAddSticker'

export type IdleViewState = {
	type: 'idle'
	selectedIds: Set<string>
	mouseDown?: {
		x: number
		y: number
	}
}

function useMouseDown({ setViewState, canvasRect }: ViewModelParams) {
	const handelOverlayMouseDown = (
		idleState: IdleViewState,
		e: React.MouseEvent<HTMLDivElement>
	) => {
		setViewState({
			...idleState,
			mouseDown: pointOnScreenToCanvas(
				{ x: e.clientX, y: e.clientY },
				canvasRect
			),
		})
	}

	const handelWindowMouseUp = (idleState: IdleViewState) => {
		setViewState({
			...idleState,
			mouseDown: undefined,
		})
	}

	return { handelOverlayMouseDown, handelWindowMouseUp }
}

export function useIdleViewModel(params: ViewModelParams) {
	const { nodesModel, setViewState, canvasRect } = params

	const selection = useSelection(params)
	const deleteSelected = useDeleteSelected(params)
	const goToAddSticker = useGoToAddSticker(params)
	const goToEditSticker = useGoToEditSticker(params)
	const mouseDown = useMouseDown(params)

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
			onMouseMove: e => {
				if (idleState.mouseDown) {
					const currentPoint = pointOnScreenToCanvas(
						{ x: e.clientX, y: e.clientY },
						canvasRect
					)

					if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
						setViewState(
							goToSelectionWindow({
								startPoint: idleState.mouseDown,
								endPoint: currentPoint,
								initialSelectedIds: e.shiftKey
									? idleState.selectedIds
									: undefined,
							})
						)
					}
				}
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
