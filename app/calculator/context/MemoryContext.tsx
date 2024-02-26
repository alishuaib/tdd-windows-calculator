"use client"
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	use,
} from "react"

// Create a context
interface MemoryContextProps {
	memoryStack: number[]
	saveMemoryStack: (value: number) => void
	clearMemoryStack: () => void
	recallMemoryStack: (index?: number) => number
	removeMemoryStack: (index: number) => void
	addMemoryStack: (value: number, index?: number) => void
	subtractMemoryStack: (value: number, index?: number) => void
}

export default function MemoryProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [memoryStack, setMemoryStack] = useState<number[]>([])

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

	function addMemoryStack(value: number, index?: number) {
		if (index !== undefined) {
			let copyMemoryStack = [...memoryStack]
			copyMemoryStack[index] = memoryStack[index] + value
			setMemoryStack([...copyMemoryStack])
		} else if (memoryStack.length > 0) {
			let copyMemoryStack = [...memoryStack]
			copyMemoryStack[memoryStack.length - 1] =
				memoryStack[memoryStack.length - 1] + value
			setMemoryStack([...copyMemoryStack])
		} else {
			saveMemoryStack(value)
		}
	}

	function subtractMemoryStack(value: number, index?: number) {
		if (index !== undefined) {
			let copyMemoryStack = [...memoryStack]
			copyMemoryStack[index] = memoryStack[index] - value
			setMemoryStack([...copyMemoryStack])
		} else if (memoryStack.length > 0) {
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
