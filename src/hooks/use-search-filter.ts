import { useCallback } from "react"

type FilterMode = "strict" | "fuzzy"

export function useSearchFilter(mode: FilterMode = "fuzzy") {
	const strictFilter = useCallback((value: string, search: string) => {
		// Strict substring match
		if (value.toLowerCase().includes(search.toLowerCase())) return 1
		return 0
	}, [])

	return mode === "fuzzy" ? undefined : strictFilter
}
