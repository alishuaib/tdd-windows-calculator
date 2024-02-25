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
	const [lastUsedOperator, setLastUsedOperator] = useState(false)
	const [isCalculationError, setIsCalculationError] = useState(false)
	const [isCalculated, setIsCalculated] = useState(false)

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
