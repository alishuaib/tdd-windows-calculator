"use client"
import React, { createContext, useState, useContext, useEffect } from "react"

// Create a context
interface DisplayContextProps {
	calculationDisplayStack: string[]
	mainDisplayStack: string[]
	setCalculationStack: React.Dispatch<React.SetStateAction<string[]>>
	setMainDisplayStack: React.Dispatch<React.SetStateAction<string[]>>
	lastUsedOperator: boolean
	setLastUsedOperator: React.Dispatch<React.SetStateAction<boolean>>
	isCalculationError: boolean
	setIsCalculationError: React.Dispatch<React.SetStateAction<boolean>>
	isCalculated: boolean
	setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>
	historyStack: { main: string[]; calculation: string[] }[]
	addToHistory: (main: string[], calculation: string[]) => void
	clearHistory: () => void
	isShowHistory: boolean
	setIsShowHistory: React.Dispatch<React.SetStateAction<boolean>>
	openMemoryHistoryPanel: boolean
	setOpenMemoryHistoryPanel: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DisplayProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [calculationDisplayStack, setCalculationStack] = useState<string[]>(
		[]
	)
	const [mainDisplayStack, setMainDisplayStack] = useState(["0"])
	const [historyStack, setHistoryStack] = useState<
		{ main: string[]; calculation: string[] }[]
	>([])
	const [isShowHistory, setIsShowHistory] = useState(false)
	const [openMemoryHistoryPanel, setOpenMemoryHistoryPanel] = useState(false)
	const [lastUsedOperator, setLastUsedOperator] = useState(false)
	const [isCalculationError, setIsCalculationError] = useState(false)
	const [isCalculated, setIsCalculated] = useState(false)

	function addToHistory(main: string[], calculation: string[]) {
		setHistoryStack((prevValue) => {
			const newHistoryItem = {
				main: main,
				calculation: calculation,
			}
			return [...prevValue, newHistoryItem]
		})
	}

	function clearHistory() {
		setHistoryStack([])
	}
	return (
		<DisplayContext.Provider
			value={{
				calculationDisplayStack,
				mainDisplayStack,
				setCalculationStack,
				setMainDisplayStack,
				lastUsedOperator,
				setLastUsedOperator,
				isCalculationError,
				setIsCalculationError,
				isCalculated,
				setIsCalculated,
				historyStack,
				addToHistory,
				clearHistory,
				isShowHistory,
				setIsShowHistory,
				openMemoryHistoryPanel,
				setOpenMemoryHistoryPanel,
			}}
		>
			{children}
		</DisplayContext.Provider>
	)
}

const DisplayContext = createContext<DisplayContextProps | undefined>(undefined)

export function useDisplay() {
	return useContext(DisplayContext)
}
