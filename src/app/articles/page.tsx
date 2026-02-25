import { Suspense } from "react"
import { getAllArticles } from "@/lib/data"
import { ArticleListClient } from "./article-list-client"

export const revalidate = 3600 // Revalidate every hour

export default async function ArticleListPage() {
	// Fetch all articles
	const allArticles = await getAllArticles()

	// Sort by date desc
	const sortedArticles = allArticles.sort((a, b) =>
		new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	)

	// Since we are passing this down to a client component, 
	// we strip the heavy markdown content to keep the HTML payload small
	const previews = sortedArticles.map(({ content, ...rest }) => rest)

	return (
		<Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading articles...</div>}>
			<ArticleListClient articles={previews} />
		</Suspense>
	)
}
