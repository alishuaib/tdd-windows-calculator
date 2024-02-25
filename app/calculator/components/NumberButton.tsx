"use client"

import Button from "./Button"
import { useDisplay } from "../context/DisplayContext"

export default function NumberButton(props: {
	number: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0"
}) {
	const { setMainDisplayStack } = useDisplay()!

	function handleNumberButtonClick(
		event: React.MouseEvent<HTMLButtonElement>
	) {
		const value = (event.target as HTMLButtonElement).textContent as string
		setMainDisplayStack((prevValue) => {
			if (prevValue[0] === "0" && prevValue.length === 1) {
				return [value]
			}
			return [...prevValue, value]
		})
	}

	return (
		<Button
			onClick={handleNumberButtonClick}
			styleType="numberKey"
		>
			{props.number}
		</Button>
	)
}