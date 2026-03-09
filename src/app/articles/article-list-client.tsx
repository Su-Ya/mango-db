"use client"

import { useSearchParams } from "next/navigation"
import { ArticleCard } from "@/components/article-card"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { Article } from "@/lib/types"

const ITEMS_PER_PAGE = 12

export function ArticleListClient({ articles }: { articles: Omit<Article, 'content'>[] }) {
	const searchParams = useSearchParams()
	const page = searchParams.get("page")
	const currentPage = Number(page) || 1

	const totalItems = articles.length
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const currentArticles = articles.slice(startIndex, endIndex)

	const getPageNumbers = () => {
		const pages = []
		const showMax = 5

		if (totalPages <= showMax) {
			for (let i = 1; i <= totalPages; i++) pages.push(i)
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
			} else {
				pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
			}
		}
		return pages
	}

	return (
		<div className="flex flex-col gap-8 pb-10">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">All Reads</h1>
				<p className="text-muted-foreground">
					{currentArticles.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalItems)} of {totalItems} reads
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
				{currentArticles.map((article) => (
					<ArticleCard key={article.id} article={article as Article} />
				))}
			</div>

			{totalItems === 0 && (
				<div className="text-center py-20 text-muted-foreground">
					No articles found.
				</div>
			)}

			{totalPages > 1 && (
				<Pagination className="mt-8">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href={currentPage > 1 ? `/articles?page=${currentPage - 1}` : "#"}
								aria-disabled={currentPage <= 1}
								className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
							/>
						</PaginationItem>

						{getPageNumbers().map((p, i) => (
							<PaginationItem key={i}>
								{p === "..." ? (
									<PaginationEllipsis />
								) : (
									<PaginationLink
										href={`/articles?page=${p}`}
										isActive={p === currentPage}
									>
										{p}
									</PaginationLink>
								)}
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								href={currentPage < totalPages ? `/articles?page=${currentPage + 1}` : "#"}
								aria-disabled={currentPage >= totalPages}
								className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</div>
	)
}
