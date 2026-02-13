import { useCallback } from "react"

type FilterMode = "strict" | "fuzzy"

export function useSearchFilter(mode: FilterMode = "fuzzy") {
	// Strict substring match
	const strictFilter = useCallback((value: string, search: string) => {
		// 將兩者都轉為小寫，進行大小寫不敏感的比對，匹配成功 returned 1，否則 returned 0
		if (value.toLowerCase().includes(search.toLowerCase())) return 1
		return 0

	}, []) // 依賴陣列為空，代表這個函式永遠不會變

	// 如果 mode 是 "fuzzy"，回傳 undefined (使用 cmdk 預設的模糊搜尋)
	// 如果 mode 是 "strict"，回傳我們自定義的 strictFilter
	return mode === "fuzzy" ? undefined : strictFilter
}
