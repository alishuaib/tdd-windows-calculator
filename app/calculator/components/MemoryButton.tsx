"use client"

import { useMemory } from "../context/MemoryContext"
import { useDisplay } from "../context/DisplayContext"

interface ButtonProps {
	type: "clear" | "recall" | "add" | "subtract" | "save" | "history"
}

export default function MemoryButton(props: ButtonProps) {
	const { mainDisplayStack, isCalculationError, setIsCalculated } =
		useDisplay()!
	const { memoryStack, setIsShowMemory, ...handle } = useMemory()!

	const typeMap = {
		clear: "MC",
		recall: "MR",
		add: "M+",
		subtract: "M-",
		save: "MS",
		history: "M↓",
	}

	const handleMap = {
		clear: handle.clearMemoryStack,
		recall: handle.recallMemoryStack,
		add: () => {
			handle.addMemoryStack(parseFloat(mainDisplayStack.join("")))
			setIsCalculated(true)
		},
		subtract: () => {
			handle.subtractMemoryStack(parseFloat(mainDisplayStack.join("")))
			setIsCalculated(true)
		},
		save: () => {
			handle.saveMemoryStack(parseFloat(mainDisplayStack.join("")))
		},
		history: () => {
			setIsShowMemory(true)
		},
	}

	let isNoValueInMemoryStack = memoryStack.length === 0
	let isClearRecallHistory =
		props.type === "clear" ||
		props.type === "recall" ||
		props.type === "history"
	let isDisabledBecauseNoValueInMemoryStack =
		isNoValueInMemoryStack && isClearRecallHistory
	return (
		<button
			className="bg-transparent hover:bg-neutral-800 py-1 disabled:opacity-50"
			onClick={() => handleMap[props.type]()}
			disabled={
				isCalculationError || isDisabledBecauseNoValueInMemoryStack
			}
		>
			{typeMap[props.type]}
		</button>
	)
}
