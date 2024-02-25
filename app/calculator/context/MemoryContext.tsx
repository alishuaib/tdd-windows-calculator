"use client"
import React, { createContext, useState, useContext, useEffect } from "react"

// Create a context
interface MemoryContextProps {
	memoryStack: number[]
	isShowMemory: boolean
	setIsShowMemory: React.Dispatch<React.SetStateAction<boolean>>
	saveMemoryStack: (value: number) => void
	clearMemoryStack: () => void
	recallMemoryStack: (index?: number) => number
	removeMemoryStack: (index: number) => void
	addMemoryStack: (value: number) => void
	subtractMemoryStack: (value: number) => void
}

export default function MemoryProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [memoryStack, setMemoryStack] = useState<number[]>([])
	const [isShowMemory, setIsShowMemory] = useState(false)

	function saveMemoryStack(value: number) {
		setMemoryStack([...memoryStack, value])
	}

	function clearMemoryStack() {
		setMemoryStack([])
	}

	function recallMemoryStack(index?: number) {
		return memoryStack[index ?? memoryStack.length - 1]
	}

	function removeMemoryStack(index: number) {
		setMemoryStack(memoryStack.filter((_, i) => i !== index))
	}

	function addMemoryStack(value: number) {
		if (memoryStack.length > 0) {
			let copyMemoryStack = [...memoryStack]
			copyMemoryStack[memoryStack.length - 1] =
				memoryStack[memoryStack.length - 1] + value
			setMemoryStack([...copyMemoryStack])
		} else {
			saveMemoryStack(value)
		}
	}

	function subtractMemoryStack(value: number) {
		if (memoryStack.length > 0) {
			let copyMemoryStack = [...memoryStack]
			copyMemoryStack[memoryStack.length - 1] =
				memoryStack[memoryStack.length - 1] - value
			setMemoryStack([...copyMemoryStack])
		} else {
			saveMemoryStack(value)
		}
	}

	return (
		<MemoryContext.Provider
			value={{
				memoryStack,
				isShowMemory,
				setIsShowMemory,
				saveMemoryStack,
				clearMemoryStack,
				recallMemoryStack,
				removeMemoryStack,
				addMemoryStack,
				subtractMemoryStack,
			}}
		>
			{children}
		</MemoryContext.Provider>
	)
}

const MemoryContext = createContext<MemoryContextProps | undefined>(undefined)

export function useMemory() {
	return useContext(MemoryContext)
}
