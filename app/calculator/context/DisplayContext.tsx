"use client"
import React, { createContext, useState, useContext, useEffect } from "react"

// Create a context
interface DisplayContextProps {
	calculationDisplayStack: string[]
	mainDisplayStack: string[]
	mainDisplayFontSize: number
	setMainDisplayFontSize: React.Dispatch<React.SetStateAction<number>>
	setCalculationStack: React.Dispatch<React.SetStateAction<string[]>>
	setMainDisplayStack: React.Dispatch<React.SetStateAction<string[]>>
	mainDisplayString: string
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
	const [mainDisplayString, setMainDisplayString] = useState("0")
	const [historyStack, setHistoryStack] = useState<
		{ main: string[]; calculation: string[] }[]
	>([])
	const [mainDisplayFontSize, setMainDisplayFontSize] = useState(1.8)
	const [isShowHistory, setIsShowHistory] = useState(false)
	const [openMemoryHistoryPanel, setOpenMemoryHistoryPanel] = useState(false)
	const [lastUsedOperator, setLastUsedOperator] = useState(false)
	const [isCalculationError, setIsCalculationError] = useState(false)
	const [isCalculated, setIsCalculated] = useState(false)
	const [lockNumberInput, setLockNumberInput] = useState(false)

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

	function formatMainDisplay(str: string) {
		function sliceInteger(integer: string) {
			return parseFloat(integer.slice(0, 16))
		}
		if (isCalculationError) return "Error"
		if (str.charAt(str.length - 1) === ".")
			return sliceInteger(str).toLocaleString().concat(".")
		if (str.startsWith("0."))
			return parseFloat(parseFloat(str).toFixed(16)).toString()
		else if (str.includes(".")) {
			let integer = sliceInteger(str.split(".")[0]).toLocaleString()
			// 21 - 19 = 2
			let decimal = parseFloat(
				parseFloat(`0.${str.split(".")[1]}`).toFixed(
					Math.min(15, 20 - integer.length)
				)
			)
				.toString()
				.split(".")[1]
			return integer + "." + decimal
		}
		return sliceInteger(str).toLocaleString()
	}

	useEffect(() => {
		//Limit items in mainDisplayStack to fit formatted string criteria
		let displayString = formatMainDisplay(mainDisplayStack.join(""))
		if (mainDisplayStack.join("") !== displayString.replaceAll(",", "")) {
			setMainDisplayStack([
				...displayString.replaceAll(",", "").split(""),
			])
		}
		setMainDisplayString(displayString)
	}, [mainDisplayStack])

	return (
		<DisplayContext.Provider
			value={{
				calculationDisplayStack,
				mainDisplayStack,
				mainDisplayFontSize,
				setMainDisplayFontSize,
				setCalculationStack,
				setMainDisplayStack,
				mainDisplayString,
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
