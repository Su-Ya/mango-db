import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllArticles } from "@/lib/data"
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

export const revalidate = 3600 // Revalidate every hour

const ITEMS_PER_PAGE = 12

export default async function ArticleListPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const resolvedSearchParams = await searchParams
	const currentPage = Number(resolvedSearchParams.page) || 1

	if (currentPage < 1) notFound()

	// Fetch all articles
	const allArticles = await getAllArticles()

	// Sort by date desc
	const sortedArticles = allArticles.sort((a, b) =>
		new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	)

	// Calculate pagination
	const totalItems = sortedArticles.length
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

	if (totalItems > 0 && currentPage > totalPages) {
		notFound()
	}

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const currentArticles = sortedArticles.slice(startIndex, endIndex)

	// Pagination Logic Helper
	const getPageNumbers = () => {
		const pages = []
		const showMax = 5

		if (totalPages <= showMax) {
			for (let i = 1; i <= totalPages; i++) pages.push(i)
		} else {
			// Always show first, last, current, and neighbors
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
				<h1 className="text-3xl font-bold tracking-tight">All Articles</h1>
				<p className="text-muted-foreground">
					Showing {currentArticles.length} of {totalItems} articles
				</p>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{currentArticles.map((article) => (
					<ArticleCard key={article.id} article={article} />
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

						{/* Previous */}
						<PaginationItem>
							<PaginationPrevious
								href={currentPage > 1 ? `/articles?page=${currentPage - 1}` : "#"}
								aria-disabled={currentPage <= 1}
								className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
							/>
						</PaginationItem>

						{/* Page Numbers */}
						{getPageNumbers().map((page, i) => (
							<PaginationItem key={i}>
								{page === "..." ? (
									<PaginationEllipsis />
								) : (
									<PaginationLink
										href={`/articles?page=${page}`}
										isActive={page === currentPage}
									>
										{page}
									</PaginationLink>
								)}
							</PaginationItem>
						))}

						{/* Next */}
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
