"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"
import { useEffect } from "react"

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

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === props.number && event.ctrlKey == false) {
				event.preventDefault()
				handleNumberButtonClick()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	})

	function handleNumberButtonClick() {
		let value = props.number
		if (isCalculated) {
			setMainDisplayStack([value])
			setCalculationStack([])
			setIsCalculated(false)
		} else {
			setMainDisplayStack((prevValue) => {
				if (
					(prevValue[0] === "0" && prevValue.length === 1) ||
					lastUsedOperator
				) {
					return [value]
				}
				return [...prevValue, value]
			})
		}
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
