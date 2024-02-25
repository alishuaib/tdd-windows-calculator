"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"

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
	} = useDisplay()!
	const operatorSymbolMap = {
		add: "+",
		subtract: "-",
		multiply: "×",
		divide: "÷",
	}

	function processExpression(expression: string[]) {
		type Operation = "+" | "-" | "×" | "÷"
		let operationFunctionMap = {
			"+": (a: number, b: number) => a + b,
			"-": (a: number, b: number) => a - b,
			"×": (a: number, b: number) => a * b,
			"÷": (a: number, b: number) => a / b,
		}

		let result = operationFunctionMap[expression[1] as Operation](
			parseInt(expression[0]),
			parseInt(expression[2])
		)

		return result.toString()
	}

	function handleOperatorButtonClick(
		event: React.MouseEvent<HTMLButtonElement>
	) {
		const value = (event.target as HTMLButtonElement).textContent as string

		if (lastUsedOperator) {
			//If the last button pressed was an operator, replace expression with the new operator
			setCalculationStack(() => {
				return [...calculationDisplayStack.slice(0, -1), value]
			})
		} else if (calculationDisplayStack.length > 0) {
			// If there is already an expression in calculationDisplayStack, operate the display number and show result
			// In both calculationDisplay and mainDisplay

			let answer = processExpression([
				...calculationDisplayStack,
				mainDisplayStack.join(""),
			])
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
		>
			{operatorSymbolMap[props.operator]}
		</Button>
	)
}
