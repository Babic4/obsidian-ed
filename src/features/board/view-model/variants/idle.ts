import { selectItems, type SelectionModifier } from '../../domain/selection'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type'
import { goToAddSticker } from './add-sticker'
import { distanceFromPoints } from '../../domain/point'
import { goToSelectionWindow } from './selection-window'
import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas'

export type IdleViewState = {
	type: 'idle'
	selectedIds: Set<string>
	mouseDown?: {
		x: number
		y: number
	}
}

export function useIdleViewModel({
	nodesModel,
	setViewState,
	canvasRect,
}: ViewModelParams) {
	const select = (
		lastState: IdleViewState,
		ids: string[],
		modif: SelectionModifier
	) => {
		setViewState({
			...lastState,
			selectedIds: selectItems(lastState.selectedIds, ids, modif),
		})
	}

	return (idleState: IdleViewState): ViewModel => ({
		nodes: nodesModel.nodes.map(node => ({
			...node,
			isSelected: idleState.selectedIds.has(node.id),
			onClick: e => {
				if (e.ctrlKey || e.shiftKey) {
					select(idleState, [node.id], 'toggle')
				} else {
					select(idleState, [node.id], 'replace')
				}
			},
		})),
		layout: {
			onKeyDown: e => {
				if (e.key === 's') {
					setViewState(goToAddSticker())
				}
			},
		},
		overlay: {
			onClick: () => {
				select(idleState, [], 'replace')
			},
			onMouseDown: e => {
				setViewState({
					...idleState,
					mouseDown: pointOnScreenToCanvas(
						{ x: e.clientX, y: e.clientY },
						canvasRect
					),
				})
			},
		},
		window: {
			onMouseUp: () => {
				setViewState({
					...idleState,
					mouseDown: undefined,
				})
			},
			onMouseMove: e => {
				if (idleState.mouseDown) {
					const currentPoint = pointOnScreenToCanvas(
						{ x: e.clientX, y: e.clientY },
						canvasRect
					)

					if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
						setViewState(goToSelectionWindow(idleState.mouseDown, currentPoint))
					}
				}
			},
		},
		actions: {
			addSticker: {
				isActive: false,
				onClick: () => {
					setViewState(goToAddSticker())
				},
			},
		},
	})
}

export function goToIdle(): IdleViewState {
	return {
		type: 'idle',
		selectedIds: new Set(),
	}
}
