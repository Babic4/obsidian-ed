// import type { AddStickerViewState } from '../../model/view-state'

import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type'
import { goToAddArrow } from './add-arrow'
import { goToIdle } from './idle'

export type AddStickerViewState = {
	type: 'add-sticker'
}

export function useAddStickerViewModel({
	nodesModel,
	canvasRect,
	setViewState,
	windowPositionModel,
}: ViewModelParams) {
	return (): ViewModel => ({
		nodes: nodesModel.nodes,
		layout: {
			onKeyDown: e => {
				if (e.key === 'Escape') {
					setViewState(goToIdle())
				}
			},
		},
		canvas: {
			onClick: e => {
				if (!canvasRect) return

				const point = pointOnScreenToCanvas(
					{ x: e.clientX, y: e.clientY },
					windowPositionModel.position,
					canvasRect
				)

				nodesModel.addSticker({
					text: 'Default',
					x: point.x,
					y: point.y,
				})
				setViewState(goToIdle())
			},
		},
		actions: {
			addSticker: {
				isActive: true,
				onClick: () => {
					setViewState(goToIdle())
				},
			},
			addArrow: {
				isActive: false,
				onClick: () => {
					setViewState(goToAddArrow())
				},
			},
		},
	})
}

export function goToAddSticker(): AddStickerViewState {
	return {
		type: 'add-sticker',
	}
}
