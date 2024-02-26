"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"
import { processExpression } from "./EqualButton"
import { useEffect } from "react"

export default function OperatorButton(props: {
	operator: "add" | "subtract" | "multiply" | "divide"
}) {
	const {
		mainDisplayStack,
		calculationDisplayStack,
		setCalculationStack,
		setMainDisplayStack,
		lastUsedOperator,
		setLastUsedOperator,
		isCalculationError,
		isCalculated,
		setIsCalculationError,
		setIsCalculated,
	} = useDisplay()!

	const operatorSymbolMap = {
		add: "+",
		subtract: "-",
		multiply: "×",
		divide: "÷",
	}

	useEffect(() => {
		const operatorKeyMap = {
			add: "+",
			subtract: "-",
			multiply: "*",
			divide: "/",
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (
				event.key === operatorKeyMap[props.operator] &&
				event.ctrlKey == false
			) {
				event.preventDefault()
				handleOperatorButtonClick()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	})

	function handleOperatorButtonClick() {
		const value = operatorSymbolMap[props.operator]

		if (
			calculationDisplayStack.length > 0 &&
			calculationDisplayStack[
				calculationDisplayStack.length - 1
			].includes("$")
		) {
			if (calculationDisplayStack.length > 2) {
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
				setMainDisplayStack(() => [answer])
				setCalculationStack(() => [answer, value])
			} else {
				setCalculationStack(() => {
					return [...calculationDisplayStack, value]
				})
			}
			setIsCalculated(false)
		} else if (lastUsedOperator) {
			//If the last button pressed was an operator, replace expression with the new operator
			setCalculationStack(() => {
				return [...calculationDisplayStack.slice(0, -1), value]
			})
		} else if (isCalculated) {
			setCalculationStack(() => {
				return [mainDisplayStack.join(""), value]
			})
			setIsCalculated(false)
		} else if (calculationDisplayStack.length > 0) {
			// If there is already an expression in calculationDisplayStack, operate the display number and show result
			// In both calculationDisplay and mainDisplay
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
			setMainDisplayStack(() => [answer])
			setCalculationStack(() => [answer, value])
		} else {
			// Add the joined mainDisplayStack numbers and clicked operator to the calculationDisplayStack
			setCalculationStack(() => {
				return [mainDisplayStack.join(""), value]
			})
		}
		setLastUsedOperator(true)
	}

	return (
		<Button
			onClick={handleOperatorButtonClick}
			styleType="operationKey"
			disabled={isCalculationError}
		>
			{operatorSymbolMap[props.operator]}
		</Button>
	)
}
