"use client"

import { useMemory } from "../context/MemoryContext"
import { useDisplay } from "../context/DisplayContext"
import { useState } from "react"

export default function MemoryPanel() {
	const { mainDisplayStack, isCalculationError } = useDisplay()!
	const { memoryStack, isShowMemory, setIsShowMemory, ...handle } =
		useMemory()!

	return (
		<div
			className={`absolute w-full h-full left-0 bg-black/40 flex flex-col items-end transition-all ${
				isShowMemory ? "top-1" : "top-full"
			}`}
		>
			<span
				className="flex-1 cursor-pointer w-full"
				onClick={() => setIsShowMemory(false)}
			/>
			<div className="h-2/3 w-full flex flex-col bg-neutral-800 rounded-t-lg pt-5 px-1 ">
				{memoryStack.map((value, index) => (
					<div
						data-testid={`memoryItem${index}`}
						className="text-right text-2xl text-neutral-100 py-1 px-4 hover:bg-neutral-700 rounded-sm"
						key={index}
					>
						<p>{value}</p>
					</div>
				))}
			</div>
		</div>
	)
}
