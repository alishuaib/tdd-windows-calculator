"use client"
import Calculator from "./calculator/Calculator"
import ContextManager from "./calculator/context/ContextManager"

export default function Home() {
	return (
		<div
			id="bgContainer"
			className="w-screen h-screen flex  justify-center items-center"
		>
			<ContextManager>
				<Calculator />
			</ContextManager>
		</div>
	)
}
