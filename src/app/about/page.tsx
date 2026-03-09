import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
// Next.js 會自動在編譯時加上 gihub repo name /mango-db/ 前綴
import signLogo from "@/public/sign_logo.png"

export default function AboutPage() {
	return (
		<div className="p-4 sm:p-6 md:p-8">
			<h1 className="font-headline text-4xl font-bold tracking-tight mb-8">About Me</h1>
			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row items-center gap-6">
						<Avatar className="h-32 w-32 border-2 border-orange-500">
							<AvatarImage src={signLogo.src} alt="mango logo" />
							<AvatarFallback>mango logo</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className="font-headline text-3xl">mango</CardTitle>
							<div className="flex gap-2 mt-4">
								<Button variant="outline" asChild>
									<a href="https://mail.google.com/mail/?view=cm&fs=1&to=mango.su.tw@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
										<Mail className="h-4 w-4" />
										<span>mango.su.tw@gmail.com</span>
									</a>
								</Button>
								<Button variant="outline" asChild>
									<a href="https://github.com/Su-Ya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
										<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-4 w-4">
											<title>GitHub</title>
											<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
										</svg>
										<span>https://github.com/Su-Ya</span>
									</a>
								</Button>
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="prose dark:prose-invert max-w-none text-foreground space-y-4">
						<p>Hi 大家好～我是 mango 芒果。<br />
							這個 Blog 內容聚焦在兩個主題：
						</p>
						<ul className="mt-0">
							<li>工程師 ( 技術研究、開發踩雷等 ) 💻</li>
							<li>個人成長 ( 腦袋思維、強身健體等 ) 🧠💪🫁</li>
						</ul>
						<p>歡迎 Email 交流～</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
