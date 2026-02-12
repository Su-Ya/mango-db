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
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function SearchDialog({
	articles,
	trigger,
	open: openProp,
	onOpenChange: setOpenProp,
}: SearchDialogProps) {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
	const filter = useSearchFilter('strict')

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

	const handleOpenChange = (value: boolean) => {
		setOpen(value)
		setOpenProp?.(value)
	}

	const handleSelect = React.useCallback(
		(slug: string) => {
			handleOpenChange(false)
			router.push(`/articles/${slug}`)
		},
		[router]
	)

	// Use controlled state if prop is provided, otherwise local state
	const isOpen = openProp ?? open

	return (
		<>
			{trigger && (
				<div onClick={() => handleOpenChange(true)}>{trigger}</div>
			)}
			<CommandDialog
				open={isOpen}
				onOpenChange={handleOpenChange}
				commandProps={{
					filter,
				}}
			>
				<CommandInput placeholder="Type a command or search..." />
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
