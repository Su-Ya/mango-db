import { getAllArticles, getArticleBySlug } from "@/lib/data"
import { MarkdownRenderer } from "@/lib/markdown-renderer"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye } from "lucide-react"
import { Metadata } from "next"

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	const articles = await getAllArticles()
	return articles.map((article) => ({
		slug: encodeURIComponent(article.slug),
	}))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params
	const decodedSlug = decodeURIComponent(slug)
	const article = await getArticleBySlug(decodedSlug)

	if (!article) {
		return { title: 'Article Not Found' }
	}

	return {
		title: article.title,
		description: article.description,
	}
}

export default async function ArticleDetailPage({ params }: PageProps) {
	const { slug } = await params
	const decodedSlug = decodeURIComponent(slug)
	const article = await getArticleBySlug(decodedSlug)

	if (!article) {
		notFound()
	}

	return (
		<div className="max-w-4xl mx-auto pb-20">
			{/* Article Header */}
			<header className="mb-10 space-y-6 text-center border-b pb-10">
				<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<Calendar className="h-3 w-3" />
						<time dateTime={article.publishedAt}>
							{new Date(article.publishedAt).toLocaleDateString()}
						</time>
					</div>
					{article.viewCount > 0 && (
						<>
							<span>•</span>
							<div className="flex items-center gap-1">
								<Eye className="h-3 w-3" />
								<span>{article.viewCount} views</span>
							</div>
						</>
					)}
				</div>

				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
					{article.title}
				</h1>

				<div className="flex items-center justify-center gap-4">
					<div className="flex items-center gap-2">
						{article.tags.map(tag => (
							<Badge key={tag} variant="secondary">{tag}</Badge>
						))}
					</div>
				</div>
			</header>

			{/* Article Content */}
			<main>
				<MarkdownRenderer content={article.content} />
			</main>

			{/* Article Footer */}
			<footer className="mt-16 pt-8 border-t">
			</footer>
		</div>
	)
}
