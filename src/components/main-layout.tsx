import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"
import { getAllArticles } from "@/lib/data"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

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
					<div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden border-1 border-orange-500">
						<Image
							src="/sign_logo.png"
							alt="Logo"
							width={32}
							height={32}
							className="object-cover"
						/>
					</div>
					<span className="text-sm font-semibold">mango's DB</span>
				</header>

				{/* Page Content */}
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
