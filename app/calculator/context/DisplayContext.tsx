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

	// Clear the last used operator when the main display stack changes
	// This only happens when a key other than an operator is pressed
	useEffect(() => {
		setLastUsedOperator(false)
	}, [mainDisplayStack])

	return (
		<DisplayContext.Provider
			value={{
				calculationDisplayStack,
				mainDisplayStack,
				setCalculationStack,
				setMainDisplayStack,
				lastUsedOperator,
				setLastUsedOperator,
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
