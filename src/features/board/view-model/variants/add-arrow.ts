import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type'
import { goToAddSticker } from './add-sticker'
import { goToIdle } from './idle'

export type AddArrowViewState = {
	type: 'add-arrow'
}

export function useAddArrowViewModel({
	nodesModel,
	setViewState,
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
		actions: {
			addArrow: {
				isActive: true,
				onClick: () => {
					setViewState(goToIdle())
				},
			},
			addSticker: {
				isActive: false,
				onClick: () => {
					setViewState(goToAddSticker())
				},
			},
		},
	})
}

export function goToAddArrow(): AddArrowViewState {
	return {
		type: 'add-arrow',
	}
}
