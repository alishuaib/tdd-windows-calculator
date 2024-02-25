"use client"
import React, { createContext, useState, useContext } from "react"

// Create a context
interface DisplayContextProps {
	calculationDisplayStack: string[]
	mainDisplayStack: string[]
	setCalculationStack: React.Dispatch<React.SetStateAction<string[]>>
	setMainDisplayStack: React.Dispatch<React.SetStateAction<string[]>>
}

export default function DisplayContextWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	const [calculationDisplayStack, setCalculationStack] = useState<string[]>(
		[]
	)
	const [mainDisplayStack, setMainDisplayStack] = useState(["0"])

	return (
		<DisplayContext.Provider
			value={{
				calculationDisplayStack,
				mainDisplayStack,
				setCalculationStack,
				setMainDisplayStack,
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
