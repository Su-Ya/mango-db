import { getAllArticles, getArticleBySlug } from "@/lib/data"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
		slug: article.slug,
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
					<Badge variant="outline" className="rounded-full"> Article </Badge>
					<span>•</span>
					<div className="flex items-center gap-1">
						<Calendar className="h-3 w-3" />
						<time dateTime={article.publishedAt}>
							{new Date(article.publishedAt).toLocaleDateString(undefined, {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
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
						<Avatar className="h-10 w-10 border">
							<AvatarImage src={article.author.avatar} />
							<AvatarFallback>{article.author.name[0]}</AvatarFallback>
						</Avatar>
						<div className="text-left">
							<p className="text-sm font-medium">{article.author.name}</p>
							<p className="text-xs text-muted-foreground">Author</p>
						</div>
					</div>
				</div>
			</header>

			{/* Article Content */}
			<main>
				<MarkdownRenderer content={article.content} />
			</main>

			{/* Article Footer / Tags */}
			<footer className="mt-16 pt-8 border-t">
				<div className="flex flex-wrap gap-2">
					{article.tags.map(tag => (
						<Badge key={tag} variant="secondary">#{tag}</Badge>
					))}
				</div>
			</footer>
		</div>
	)
}
