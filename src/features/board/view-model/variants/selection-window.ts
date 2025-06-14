import { createRectFromPoints } from '../../domain/rect'
import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type'
import { goToIdle } from './idle'

export type SelectionWindowViewState = {
	type: 'selection-window'
	startPoint: {
		x: number
		y: number
	}
	endPoint: {
		x: number
		y: number
	}
}

export function useSelectionWindowViewModel({
	nodesModel,
	setViewState,
	canvasRect,
}: ViewModelParams) {
	return (state: SelectionWindowViewState): ViewModel => {
		const rect = createRectFromPoints(state.startPoint, state.endPoint)

		return {
			nodes: nodesModel.nodes,
			selectionWindow: rect,
			window: {
				onMouseMove: e => {
					const currentPoint = pointOnScreenToCanvas(
						{
							x: e.clientX,
							y: e.clientY,
						},
						canvasRect
					)

					setViewState({ ...state, endPoint: currentPoint })
				},
				onMouseUp: () => {
					setViewState(goToIdle())
				},
			},
		}
	}
}

export function goToSelectionWindow(
	startPoint: {
		x: number
		y: number
	},
	endPoint: {
		x: number
		y: number
	}
): SelectionWindowViewState {
	return {
		type: 'selection-window',
		startPoint,
		endPoint,
	}
}
