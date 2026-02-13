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

import { useSearchFilter } from "@/hooks/use-search-filter"

interface SearchDialogProps {
	articles: Article[]
	trigger?: React.ReactNode
}

export function SearchDialog({
	articles,
	trigger,
}: SearchDialogProps) {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
	const filter = useSearchFilter()

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
				filter={filter}
			>
				<CommandInput placeholder="Fuzzy search article titles..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Articles">
						{articles.map((article) => (
							<CommandItem
								key={article.id}
								value={article.title}
								onSelect={() => handleSelect(article.slug)}
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
