"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"

export default function OperatorButton(props: {
	operator: "add" | "subtract" | "multiply" | "divide"
}) {
	const { mainDisplayStack, setCalculationStack } = useDisplay()!
	const operatorMap = {
		add: "+",
		subtract: "-",
		multiply: "×",
		divide: "÷",
	}

	function handleOperatorButtonClick(
		event: React.MouseEvent<HTMLButtonElement>
	) {
		const value = (event.target as HTMLButtonElement).textContent as string

		setCalculationStack(() => {
			return [...mainDisplayStack, value]
		})
	}

	return (
		<Button
			onClick={handleOperatorButtonClick}
			styleType="operationKey"
		>
			{operatorMap[props.operator]}
		</Button>
	)
}
