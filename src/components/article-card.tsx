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
import { cn } from "@/lib/utils"

interface ArticleCardProps {
	article: Article
	className?: string
}

export function ArticleCard({ article, className }: ArticleCardProps) {
	return (
		<Link href={`/articles/${article.slug}`} className={cn("block group", className)}>
			<Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-xl hover:dark:shadow-orange-500/10 hover:-translate-y-1">
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
				</CardHeader>
				<CardContent className="flex-grow">
					<CardTitle className="line-clamp-2 text-xl leading-tight group-hover:text-orange-500 transition-colors">
						{article.title}
					</CardTitle>
					<CardDescription className="line-clamp-3">
						{article.description}
					</CardDescription>
				</CardContent>
				<CardFooter className="flex items-center justify-between p-4 mt-auto">
					{/* Tags */}
					<div className="flex flex-wrap gap-1">
						{article.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
							// <Badge key={tag} variant="outline" className="px-1 py-0 text-[10px]">
							// 	{tag}
							// </Badge>
						))}
					</div>
				</CardFooter>
			</Card>
		</Link>
	)
}
