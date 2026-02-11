import Link from 'next/link'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import { HackmdParser } from '@/lib/hackmd-parser'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
	content: string
	className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
		breaks: true, // Fix: Enable line breaks
	})

	// Use plugins
	md.use(HackmdParser.highlight);
	md.use(HackmdParser.callout);
	md.use(anchor, {
		permalink: anchor.permalink.headerLink()
	})

	const htmlContent = md.render(content)

	return (
		<article
			className={cn(
				"prose prose-slate dark:prose-invert max-w-none",
				"prose-headings:font-bold prose-headings:tracking-tight",
				"prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
				"prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
				"prose-img:rounded-xl prose-img:shadow-md",
				className
			)}
			dangerouslySetInnerHTML={{ __html: htmlContent }}
		/>
	)
}
