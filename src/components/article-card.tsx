import Link from "next/link"
import { Calendar, Eye, Tag } from "lucide-react"
import { Article } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ArticleCardProps {
	article: Article
	className?: string
}

export function ArticleCard({ article, className }: ArticleCardProps) {
	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Calendar className="h-3 w-3" />
						<time dateTime={article.publishedAt}>
							{new Date(article.publishedAt).toLocaleDateString()}
						</time>
					</div>
					{article.viewCount > 0 && (
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<Eye className="h-3 w-3" />
							<span>{article.viewCount}</span>
						</div>
					)}
				</div>
				<Link href={`/articles/${article.slug}`} className="hover:underline">
					<CardTitle className="line-clamp-2 text-xl leading-tight">
						{article.title}
					</CardTitle>
				</Link>
				<CardDescription className="line-clamp-3">
					{article.description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Tags */}
				<div className="flex flex-wrap gap-1">
					{article.tags.map((tag) => (
						<Badge key={tag} variant="secondary" className="px-1 py-0 text-[10px]">
							{tag}
						</Badge>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-between border-t p-4">
				<div className="flex items-center gap-2">
					<Avatar className="h-6 w-6">
						<AvatarImage src={article.author.avatar} alt={article.author.name} />
						<AvatarFallback>{article.author.name[0]}</AvatarFallback>
					</Avatar>
					<span className="text-xs text-muted-foreground">
						{article.author.name}
					</span>
				</div>
				<Link
					href={`/articles/${article.slug}`}
					className="text-sm font-medium text-primary hover:underline"
				>
					Read More →
				</Link>
			</CardFooter>
		</Card>
	)
}
