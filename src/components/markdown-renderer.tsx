import MarkdownIt from 'markdown-it'
import Container from 'markdown-it-container'
import anchor from 'markdown-it-anchor'
// @ts-ignore
import { markPlugin } from '@/lib/markdown-plugins'
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
	md.use(markPlugin)
	md.use(anchor, {
		permalink: anchor.permalink.headerLink()
	})

	// Use custom mark plugin
	md.use(markPlugin)

	// HackMD Callout Plugin Configuration
	const createContainer = (name: string, defaultTitle: string) => {
		return [
			Container,
			name,
			{
				render: (tokens: any[], idx: number) => {
					const token = tokens[idx]
					const info = token.info.trim().slice(name.length).trim()

					if (token.nesting === 1) {
						// Opening tag
						return `<div class="callout callout-${name}">
                      <p class="callout-title">
                        ${info || defaultTitle}
                      </p>\n`
					} else {
						// Closing tag
						return '</div>\n'
					}
				},
			},
		]
	}

	// Register containers for different types
	md.use(...createContainer('info', 'Info'))
		.use(...createContainer('success', 'Success'))
		.use(...createContainer('warning', 'Warning'))
		.use(...createContainer('danger', 'Danger'))
		.use(...createContainer('spoiler', 'Spoiler'))

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
