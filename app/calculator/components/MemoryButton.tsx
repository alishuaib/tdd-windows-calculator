"use client"

import { useMemory } from "../context/MemoryContext"
import { useDisplay } from "../context/DisplayContext"
import { useEffect } from "react"

interface ButtonProps {
	type: "clear" | "recall" | "add" | "subtract" | "save" | "history"
	index?: number
	styleOverride?: string
}

export default function MemoryButton(props: ButtonProps) {
	const {
		mainDisplayStack,
		isCalculationError,
		setIsCalculated,
		setMainDisplayStack,
		setOpenMemoryHistoryPanel,
		setIsShowHistory,
	} = useDisplay()!
	const { memoryStack, ...handle } = useMemory()!

	const typeMap = {
		clear: "MC",
		recall: "MR",
		add: "M+",
		subtract: "M-",
		save: "MS",
		history: "M↓",
	}

	const titleMap = {
		clear:
			props.index !== undefined
				? "Clear memory item"
				: "Clear all memory (Ctrl+L)",
		recall: "Memory recall (Ctrl+R)",
		add:
			props.index !== undefined
				? "Add to memory item"
				: "Memory add (Ctrl+P)",
		subtract:
			props.index !== undefined
				? "Subtract from memory item"
				: "Memory subtract (Ctrl+Q)",
		save: "Memory store (Ctrl+M)",
		history: "Memory",
	}

	useEffect(() => {
		const typeKeyMap = {
			clear: "l",
			recall: "r",
			add: "p",
			subtract: "q",
			save: "m",
			history: "n/a",
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.ctrlKey && event.key === typeKeyMap[props.type]) {
				event.preventDefault()
				handleMap[props.type]()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	})

	const handleMap = {
		clear: () => {
			props.index !== undefined
				? handle.removeMemoryStack(props.index)
				: handle.clearMemoryStack()
		},
		recall: () => {
			let lastMemoryValue = handle.recallMemoryStack()
			setMainDisplayStack([lastMemoryValue.toString()])
		},
		add: () => {
			props.index !== undefined
				? handle.addMemoryStack(
						parseFloat(mainDisplayStack.join("")),
						props.index
				  )
				: handle.addMemoryStack(parseFloat(mainDisplayStack.join("")))
			setIsCalculated(true)
		},
		subtract: () => {
			props.index !== undefined
				? handle.subtractMemoryStack(
						parseFloat(mainDisplayStack.join("")),
						props.index
				  )
				: handle.subtractMemoryStack(
						parseFloat(mainDisplayStack.join(""))
				  )
			setIsCalculated(true)
		},
		save: () => {
			handle.saveMemoryStack(parseFloat(mainDisplayStack.join("")))
			setIsCalculated(true)
		},
		history: () => {
			setIsShowHistory(false)
			setOpenMemoryHistoryPanel(true)
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
			title={titleMap[props.type]}
			className={
				props.styleOverride ??
				"bg-transparent hover:bg-neutral-800 py-1 disabled:opacity-50"
			}
			onClick={() => handleMap[props.type]()}
			disabled={
				isCalculationError || isDisabledBecauseNoValueInMemoryStack
			}
		>
			{typeMap[props.type]}
		</button>
	)
}
