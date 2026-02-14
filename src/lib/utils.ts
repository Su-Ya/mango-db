import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fuzzyMatch(value: string, search: string) {
  // 將兩者都轉為小寫，進行大小寫不敏感的比對
  const v = value.toLowerCase()
  const s = search.toLowerCase()

  let i = 0
  let j = 0
  while (i < v.length && j < s.length) {
    // 模糊搜尋
    // 例如輸入 "react" 會匹配 "R...e...a...c...t" (跳字)
    if (v[i] === s[j]) {
      j++
    }
    i++
  }
  return j === s.length
}
