import { goToAddArrow } from '../variants/add-arrow'
import { goToAddSticker } from '../variants/add-sticker'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type'

export function useCommonActionsDecorator({ setViewState }: ViewModelParams) {
	return (viewModel: ViewModel): ViewModel => {
		return {
			...viewModel,
			layout: {
				...viewModel.layout,
				onKeyDown: e => {
					viewModel.layout?.onKeyDown?.(e)
					if (e.code === 'KeyS') {
						setViewState(goToAddSticker())
					}
					if (e.code === 'KeyA') {
						setViewState(goToAddArrow())
					}
				},
			},
			actions: {
				addArrow: {
					isActive: false,
					onClick: () => setViewState(goToAddArrow()),
				},
				addSticker: {
					isActive: false,
					onClick: () => setViewState(goToAddSticker()),
				},
				...viewModel.actions,
			},
		}
	}
}
