"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"
import { processExpression } from "./EqualButton"
import { useEffect, useState } from "react"

type AdvancedOperation = "reciprocal" | "squareroot" | "square"

function processReciprocal(a: string) {
	//1/x $ 1/x$10
	let index = a.indexOf("$")

	let denominator = a.substring(index + 1)

	if (denominator.includes("$")) {
		denominator = processReciprocal(denominator)
	}

	return (1 / parseFloat(denominator)).toString()
}

function processSquareroot(a: string) {
	//²√x $ ²√x$10
	let index = a.indexOf("$")

	let number = a.substring(index + 1)

	if (number.includes("$")) {
		number = processSquareroot(number)
	}

	return Math.sqrt(parseFloat(number)).toString()
}

function processSquare(a: string) {
	//x² $ x²$10
	let index = a.indexOf("$")

	let number = a.substring(index + 1)

	if (number.includes("$")) {
		number = processSquare(number)
	}

	return (parseFloat(number) ** 2).toString()
}

const processAdvancedExpression = {
	reciprocal: (a: string) => processReciprocal(a),
	squareroot: (a: string) => processSquareroot(a),
	square: (a: string) => processSquare(a),
}

export function detectAdvancedOperation(a: string) {
	if (a.includes("1/")) {
		return processReciprocal(a)
	} else if (a.includes("√")) {
		return processSquareroot(a)
	} else if (a.includes("sqr")) {
		return processSquare(a)
	}
	return a
}

export default function AdvancedOperatorButton(props: {
	operator: AdvancedOperation
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
		reciprocal: "1/x",
		squareroot: "²√x",
		square: "x²",
	}

	const operatorValueMap = {
		reciprocal: "1/x",
		squareroot: "√x",
		square: "sqrx",
	}

	useEffect(() => {
		const operatorKeyMap = {
			reciprocal: "R",
			squareroot: "@",
			square: "Q",
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === operatorKeyMap[props.operator]) {
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
		const value = operatorValueMap[props.operator]

		let expression: string
		if (lastUsedOperator) {
			//If the last item in the calculationDisplayStack is a reciprocal operation
			//And the new number is the same as previous number, then nest the reciprocal operation
			let lastExpression =
				calculationDisplayStack[calculationDisplayStack.length - 1]
			expression = value + "$" + lastExpression

			setCalculationStack((prevValue) => {
				//Filter out any expressions with $
				let filtered = prevValue.filter((val) => !val.includes("$"))
				return [...filtered, expression]
			})
		} else {
			// Add the joined mainDisplayStack numbers and clicked operator to the calculationDisplayStack
			expression = value + "$" + mainDisplayStack.join("")

			setCalculationStack((prevValue) => {
				return [...prevValue, expression]
			})
		}
		setMainDisplayStack(() => {
			return [
				processAdvancedExpression[props.operator as AdvancedOperation](
					expression
				),
			]
		})
		setLastUsedOperator(true)
		setIsCalculated(true)
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
