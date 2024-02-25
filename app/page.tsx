"use client"
import Calculator from "./calculator/Calculator"
import DisplayProvider from "./calculator/context/DisplayContext"

export default function Home() {
	return (
		<div
			id="bgContainer"
			className="w-screen h-screen flex  justify-center items-center"
		>
			<DisplayProvider>
				<Calculator />
			</DisplayProvider>
		</div>
	)
}
