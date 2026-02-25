import Link from "next/link"
import { ArrowRight, Flame, Clock } from "lucide-react"
import { getAllArticles } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const articles = await getAllArticles()

  // 1. Latest Articles (Top 6)
  const latestArticles = articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6)

  // 2. Popular Articles (Top 4 by viewCount)
  // Note: If API doesn't return viewCount, this might just match latest or be random
  const popularArticles = [...articles]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 4)

  return (
    <div className="flex flex-col gap-10 pb-10">

      {/* Hero / Latest Section */}
      <section className="space-y-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
          </div>
          <Button variant="ghost" className="gap-1" asChild>
            <Link href="/articles">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Popular Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-2xl font-bold tracking-tight">Popular Reads</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularArticles.map((article) => (
            <ArticleCard key={article.id} article={article} className="bg-muted/30" />
          ))}
        </div>
      </section>

    </div>
  )
}
