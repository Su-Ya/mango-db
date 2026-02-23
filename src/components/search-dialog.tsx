"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { Article } from "@/lib/types"
import { useDebounce } from "@/hooks/use-debounce"
import { fuzzyMatch } from "@/lib/utils"
interface SearchDialogProps {
	articles: Article[]
	trigger?: React.ReactNode
}

export function SearchDialog({
	articles,
	trigger,
}: SearchDialogProps) {
	const [displayQuery, setDisplayQuery] = React.useState("")
	const [searchQuery, setSearchQuery] = React.useState("")
	const isComposingRef = React.useRef(false)// 偵測注音輸入
	const debouncedQuery = useDebounce(searchQuery, 300)

	// Filter articles based on debounced query
	const filteredArticles = React.useMemo(() => {
		return articles.filter(article => fuzzyMatch(article.title, debouncedQuery))
	}, [articles, debouncedQuery])

	const [open, setOpen] = React.useState(false)
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

	const router = useRouter()
	const handleSelect = React.useCallback(
		(slug: string) => {
			setOpen(false)
			router.push(`/articles/${slug}`)
		},
		[router]
	)

	return (
		<>
			{trigger && (
				<div onClick={() => setOpen(true)}>{trigger}</div>
			)}
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				shouldFilter={false}
			>
				<CommandInput
					placeholder="Fuzzy search article titles..."
					value={displayQuery}
					onValueChange={(value) => {
						setDisplayQuery(value)
						if (!isComposingRef.current) {
							setSearchQuery(value)
						}
					}}
					onCompositionStart={() => {
						isComposingRef.current = true
					}}
					onCompositionEnd={() => {
						isComposingRef.current = false
						setSearchQuery(displayQuery)
					}}
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Articles">
						{filteredArticles.map((article) => (
							<CommandItem
								key={article.id}
								value={article.slug}
								onSelect={handleSelect}
							>
								<Search className="mr-2 h-4 w-4" />
								<span>{article.title}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}
