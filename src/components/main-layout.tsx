import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"
import { getAllArticles } from "@/lib/data"
import { Separator } from "@/components/ui/separator"

export async function MainLayout({ children }: { children: React.ReactNode }) {
	// Data fetching on the server
	const articles = await getAllArticles()

	return (
		<SidebarProvider>
			{/* Sidebar Navigation */}
			<SidebarNav articles={articles} />

			{/* Main Content Area */}
			<SidebarInset>
				{/* Mobile/Desktop Header Trigger */}
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<div className="text-sm font-medium text-muted-foreground">
						{/* We can add Breadcrumbs here later */}
						Tech Blog
					</div>
				</header>

				{/* Page Content */}
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
