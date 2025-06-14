import { useState, useEffect, startTransition } from 'react'

export function useDebouncedValue<T>(value: T, delay: number) {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(
			() => startTransition(() => setDebounceValue(value)),
			delay
		)

		return () => clearTimeout(timer)
	}, [value, delay])

	return debounceValue
}
