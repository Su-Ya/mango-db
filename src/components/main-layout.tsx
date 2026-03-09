import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"
import { getAllArticles } from "@/lib/data"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import signLogo from "@/public/sign_logo.png"
import Link from "next/link"

export async function MainLayout({ children }: { children: React.ReactNode }) {
	// Data fetching on the server
	const articles = await getAllArticles()

	return (
		<SidebarProvider>
			{/* Sidebar Navigation */}
			<SidebarNav articles={articles} />

			{/* Main Content Area */}
			<SidebarInset>
				{/* Mobile Header Trigger */}
				<header className="flex md:hidden h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Link href="/" className="flex flex-1 items-center gap-2 group outline-none overflow-hidden">
						<div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden border-1 border-orange-500">
							<Image
								src={signLogo}
								alt="Logo"
								width={32}
								height={32}
								className="object-cover"
							/>
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">mangoDB</span>
							<span className="truncate text-xs">Configuring Daily 💻🧠💪</span>
						</div>
					</Link>
				</header>

				{/* Page Content */}
				<div className="flex flex-1 flex-col gap-4 p-4">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
