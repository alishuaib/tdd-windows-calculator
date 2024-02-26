"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"
import { detectAdvancedOperation } from "./AdvancedOperatorButton"
import { useEffect } from "react"

export function processExpression(expression: string[]) {
	type Operation = "+" | "-" | "×" | "÷"
	let operationFunctionMap = {
		"+": (a: number, b: number) => a + b,
		"-": (a: number, b: number) => a - b,
		"×": (a: number, b: number) => a * b,
		"÷": (a: number, b: number) => a / b,
	}

	let firstNumber = expression[0]
	let operator = expression[1] as Operation
	let secondNumber = expression[2]

	if (firstNumber.includes("$")) {
		firstNumber = detectAdvancedOperation(firstNumber)
	}

	if (secondNumber.includes("$")) {
		secondNumber = detectAdvancedOperation(secondNumber)
	}

	let result = operationFunctionMap[operator](
		parseFloat(firstNumber),
		parseFloat(secondNumber)
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
		isCalculated,
		setIsCalculated,
		setLastUsedOperator,
		addToHistory,
	} = useDisplay()!

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (
				(event.key === "=" || event.key === "Enter") &&
				event.ctrlKey == false
			) {
				event.preventDefault()
				handleEqualButtonClick()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	})

	function handleEqualButtonClick() {
		const value = "="
		if (isCalculated && calculationDisplayStack.includes("=")) {
			return
		}
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
		if (
			calculationDisplayStack[
				calculationDisplayStack.length - 1
			].includes("$")
		) {
			setCalculationStack(() => [...calculationDisplayStack, value])
		} else {
			setCalculationStack(() => [
				...calculationDisplayStack,
				mainDisplayStack.join(""),
				value,
			])
		}
		setMainDisplayStack(() => [answer])
		addToHistory(
			[answer],
			[...calculationDisplayStack, mainDisplayStack.join(""), value]
		)
		setIsCalculated(true)
		setLastUsedOperator(false)
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
