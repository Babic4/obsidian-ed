import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas'
import type { IdleViewState } from '.'
import type { ViewModelParams } from '../../view-model-params'

export function useMouseDown({ setViewState, canvasRect }: ViewModelParams) {
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
