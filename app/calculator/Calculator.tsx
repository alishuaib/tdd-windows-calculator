"use client"

import { useState } from "react"
import Button from "./components/Button"

export default function Calculator() {
	const [mainDisplayValue, setMainDisplayValue] = useState(["0"])

	function handleNumberButtonClick(
		event: React.MouseEvent<HTMLButtonElement>
	) {
		const value = (event.target as HTMLButtonElement).textContent as string
		setMainDisplayValue((prevValue) => {
			if (prevValue[0] === "0" && prevValue.length === 1) {
				return [value]
			}
			return [...prevValue, value]
		})
	}

	return (
		<div>
			<p data-testid="mainDisplay">{mainDisplayValue}</p>
			<div
				id="keypad"
				className="grid grid-cols-4 gap-1"
			>
				<Button onClick={handleNumberButtonClick}>7</Button>
				<Button onClick={handleNumberButtonClick}>8</Button>
				<Button onClick={handleNumberButtonClick}>9</Button>
				<Button onClick={handleNumberButtonClick}>4</Button>
				<Button onClick={handleNumberButtonClick}>5</Button>
				<Button onClick={handleNumberButtonClick}>6</Button>
				<Button onClick={handleNumberButtonClick}>1</Button>
				<Button onClick={handleNumberButtonClick}>2</Button>
				<Button onClick={handleNumberButtonClick}>3</Button>
				<Button onClick={handleNumberButtonClick}>0</Button>
			</div>
		</div>
	)
}
