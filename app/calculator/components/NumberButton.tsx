"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"

export default function NumberButton(props: {
	number: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0"
}) {
	const {
		lastUsedOperator,
		setMainDisplayStack,
		setLastUsedOperator,
		isCalculationError,
		isCalculated,
		setCalculationStack,
		setIsCalculated,
	} = useDisplay()!

	function handleNumberButtonClick(
		event: React.MouseEvent<HTMLButtonElement>
	) {
		const value = (event.target as HTMLButtonElement).textContent as string
		if (isCalculated) {
			setMainDisplayStack([value])
			setCalculationStack([])
			setIsCalculated(false)
			return
		}
		setMainDisplayStack((prevValue) => {
			if (
				(prevValue[0] === "0" && prevValue.length === 1) ||
				lastUsedOperator
			) {
				return [value]
			}
			return [...prevValue, value]
		})
		setLastUsedOperator(false)
	}

	return (
		<Button
			onClick={handleNumberButtonClick}
			styleType="numberKey"
			disabled={isCalculationError}
		>
			{props.number}
		</Button>
	)
}
