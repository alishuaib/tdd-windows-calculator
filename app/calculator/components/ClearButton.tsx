"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"
import { useEffect } from "react"

export default function ClearButton(props: {
	type: "clear" | "clearEntry" | "backspace"
}) {
	const {
		setCalculationStack,
		setMainDisplayStack,
		setLastUsedOperator,
		isCalculationError,
		setIsCalculationError,
		isCalculated,
		setIsCalculated,
	} = useDisplay()!

	const typeSymbolMap = {
		clear: "C",
		clearEntry: "CE",
		backspace: "←",
	}

	useEffect(() => {
		const typeKeyMap = {
			clear: "Escape",
			clearEntry: "Delete",
			backspace: "Backspace",
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === typeKeyMap[props.type]) {
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
		const value = typeSymbolMap[props.type]

		if (isCalculationError) {
			setMainDisplayStack(() => ["0"])
			setCalculationStack(() => [])
			setIsCalculationError(false)
			return
		}

		if (isCalculated) {
			setMainDisplayStack(() => ["0"])
			setCalculationStack(() => [])
			setIsCalculated(false)
			return
		}

		switch (value) {
			case "C":
				setMainDisplayStack(() => ["0"])
				setCalculationStack(() => [])
				break
			case "CE":
				setMainDisplayStack(() => ["0"])
				break
			case "←":
				setMainDisplayStack((prevValue) => {
					if (prevValue.length === 1) {
						return ["0"]
					}
					return prevValue.slice(0, -1)
				})
				break
		}

		setLastUsedOperator(false)
	}

	return (
		<Button
			onClick={handleOperatorButtonClick}
			styleType="operationKey"
		>
			{typeSymbolMap[props.type]}
		</Button>
	)
}
