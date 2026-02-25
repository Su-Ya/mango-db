"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, User, Search, FileText, ChevronRight } from "lucide-react"
import { Article } from "@/lib/types"
import { ModeToggle } from "@/components/mode-toggle"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/components/ui/sidebar"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SearchDialog } from "@/components/search-dialog"

interface SidebarNavProps extends React.ComponentProps<typeof Sidebar> {
	articles?: Article[]
}

export function SidebarNav({ articles = [], ...props }: SidebarNavProps) {
	const pathname = usePathname()

	// Group articles by Year > Month
	const archive = React.useMemo(() => {
		const groups: Record<string, Record<string, Article[]>> = {}

		articles.forEach(article => {
			const date = new Date(article.publishedAt)
			if (isNaN(date.getTime())) return

			const year = date.getFullYear().toString()
			const month = (date.getMonth() + 1).toString().padStart(2, '0')

			if (!groups[year]) groups[year] = {}
			if (!groups[year][month]) groups[year][month] = []

			groups[year][month].push(article)
		})

		// Sort years desc
		return Object.keys(groups).sort((a, b) => b.localeCompare(a)).map(year => ({
			year,
			months: Object.keys(groups[year]).sort((a, b) => b.localeCompare(a)).map(month => ({
				month,
				articles: groups[year][month]
			}))
		}))
	}, [articles])

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="flex items-center gap-2 px-2 py-4">
							<div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden border-1 border-orange-500">
								<Image
									src="/sign_logo.png"
									alt="Logo"
									width={32}
									height={32}
									className="object-cover"
								/>
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">mango's DB</span>
								<span className="truncate text-xs">Configuring Daily 💻🧠💪</span>
							</div>
							<ModeToggle />
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{/* Main Navigation */}
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild isActive={pathname === "/"}>
									<Link href="/">
										<Home />
										<span>Home</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild isActive={pathname === "/about"}>
									<Link href="/about">
										<User />
										<span>About Me</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild isActive={pathname === "/articles"}>
									<Link href="/articles">
										<FileText />
										<span>All Articles</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SearchDialog
									articles={articles}
									trigger={
										<SidebarMenuButton tooltip="Search">
											<Search />
											<span>Search</span>
											<span className="text-xs tracking-widest text-muted-foreground">⌘K</span>
										</SidebarMenuButton>
									}
								/>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Archive Tree */}
				<SidebarGroup>
					<SidebarGroupLabel>Archive</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{archive.map((yearGroup) => (
								<Collapsible key={yearGroup.year} defaultOpen className="group/collapsible">
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={yearGroup.year}>
												<ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
												<span>{yearGroup.year}</span>
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{yearGroup.months.map((monthGroup) => (
													<Collapsible key={monthGroup.month} className="group/month-collapsible">
														<SidebarMenuSubItem>
															<CollapsibleTrigger asChild>
																<SidebarMenuSubButton>
																	<ChevronRight className="mr-1 h-3 w-3 shrink-0 transition-transform group-data-[state=open]/month-collapsible:rotate-90" />
																	<span className="flex-1">{monthGroup.month} ({monthGroup.articles.length})</span>
																</SidebarMenuSubButton>
															</CollapsibleTrigger>
															<CollapsibleContent>
																<SidebarMenuSub>
																	{monthGroup.articles.map(article => (
																		<SidebarMenuSubItem key={article.id}>
																			<SidebarMenuSubButton asChild isActive={pathname === `/articles/${article.slug}`}>
																				<Link href={`/articles/${article.slug}`}>
																					<span>{article.title}</span>
																				</Link>
																			</SidebarMenuSubButton>
																		</SidebarMenuSubItem>
																	))}
																</SidebarMenuSub>
															</CollapsibleContent>
														</SidebarMenuSubItem>
													</Collapsible>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<div className="p-2 flex justify-center items-center">
					<span className="text-xs text-muted-foreground">© 2026</span>
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
