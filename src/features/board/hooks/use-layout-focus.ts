import { useEffect, useRef } from 'react'

export function useLayoutFocus() {
	const layoutRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (layoutRef.current) {
			layoutRef.current.focus()
		}

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				layoutRef.current?.focus()
			}
		}

		window.addEventListener('visibilityChange', handleVisibilityChange)

		return () => {
			window.removeEventListener('visibilityChange', handleVisibilityChange)
		}
	}, [layoutRef])

	return layoutRef
}
