"use client"
import Calculator from "./calculator/Calculator"
import DisplayProvider from "./calculator/context/DisplayContext"

export default function Home() {
	return (
		<div className="w-screen h-screen flex">
			<DisplayProvider>
				<Calculator />
			</DisplayProvider>
		</div>
	)
}
