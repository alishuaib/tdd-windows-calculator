"use client"
import Calculator from "./calculator/Calculator"
import DisplayContextWrapper from "./calculator/context/DisplayContext"

export default function Home() {
	return (
		<div className="w-screen h-screen flex">
			<DisplayContextWrapper>
				<Calculator />
			</DisplayContextWrapper>
		</div>
	)
}
