import type { Metadata } from "next"
import { Lato } from "next/font/google"
import "./globals.css"

const inter = Lato({
	weight: ["100", "300", "400", "700", "900"],
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "TDD Calculator",
	description: "Calculator built with Test Driven Development (TDD",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
