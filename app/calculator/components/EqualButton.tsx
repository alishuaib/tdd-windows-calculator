"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"

export function processExpression(expression: string[]) {
	type Operation = "+" | "-" | "×" | "÷"
	let operationFunctionMap = {
		"+": (a: number, b: number) => a + b,
		"-": (a: number, b: number) => a - b,
		"×": (a: number, b: number) => a * b,
		"÷": (a: number, b: number) => a / b,
	}

	let result = operationFunctionMap[expression[1] as Operation](
		parseFloat(expression[0]),
		parseFloat(expression[2])
	)
	if (expression[1] == "÷" && expression[2] == "0") {
		throw new Error("ZeroDivisionError")
	}
	return result.toString()
}

export default function EqualButton() {
	const {
		mainDisplayStack,
		calculationDisplayStack,
		setCalculationStack,
		setMainDisplayStack,
		isCalculationError,
		setIsCalculationError,
		setIsCalculated,
	} = useDisplay()!

	function handleEqualButtonClick(
		event: React.MouseEvent<HTMLButtonElement>
	) {
		const value = (event.target as HTMLButtonElement).textContent as string

		let answer: string
		try {
			answer = processExpression([
				...calculationDisplayStack,
				mainDisplayStack.join(""),
			])
		} catch (error) {
			answer = "Error"
			setIsCalculationError(true)
		}
		setCalculationStack(() => [
			...calculationDisplayStack,
			mainDisplayStack.join(""),
			value,
		])
		setMainDisplayStack(() => [answer])

		setIsCalculated(true)
	}

	return (
		<Button
			onClick={handleEqualButtonClick}
			styleType="equalKey"
			disabled={isCalculationError}
		>
			=
		</Button>
	)
}
