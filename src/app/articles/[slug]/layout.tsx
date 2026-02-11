import "@/lib/hackmd-parser/styles.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Articles",
	description: "All articles from the blog",
}

export default function ArticleLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
		</>
	)
}
