"use client"

import { useState } from "react"
import Button from "./components/Button"
import OperatorButton from "./components/OperatorButton"
import NumberButton from "./components/NumberButton"
import ClearButton from "./components/ClearButton"
import EqualButton from "./components/EqualButton"
import { useDisplay } from "./context/DisplayContext"

export default function Calculator() {
	const {
		mainDisplayStack,
		calculationDisplayStack,
		isCalculationError,
		setMainDisplayStack,
		lastUsedOperator,
		isCalculated,
		setCalculationStack,
		setLastUsedOperator,
		setIsCalculated,
	} = useDisplay()!

	function handleDecimalButtonClick() {
		setMainDisplayStack((prevValue) => {
			if (lastUsedOperator || isCalculated) {
				setLastUsedOperator(false)
				setIsCalculated(false)
				return ["0."]
			} else if (prevValue.includes(".")) {
				return prevValue
			}
			return [...prevValue, "."]
		})
	}

	function handleSignChangeButtonClick() {
		if (isCalculated) {
			setCalculationStack([])
			setIsCalculated(false)
		}
		setMainDisplayStack((prevValue) => {
			if (prevValue[0] === "0") {
				return prevValue
			}
			if (prevValue[0] === "-") {
				return prevValue.slice(1)
			}
			return ["-", ...prevValue]
		})
		setLastUsedOperator(false)
	}

	function handlePercentageButtonClick() {
		let valueInDisplay: number
		let valueInCalculation: number

		if (isCalculated) {
			setCalculationStack([])
			valueInDisplay = parseFloat(mainDisplayStack.join(""))
			valueInCalculation = valueInDisplay
		} else {
			valueInDisplay = parseFloat(mainDisplayStack.join(""))
			valueInCalculation = parseFloat(calculationDisplayStack[0] ?? 0)
		}

		const result = (valueInCalculation * valueInDisplay) / 100
		setMainDisplayStack(() => {
			return [result.toString()]
		})
		setCalculationStack((prevValue) => [...prevValue, result.toString()])
		setLastUsedOperator(false)
		setIsCalculated(false)
	}

	return (
		<div className="flex flex-col gap-4 bg-zinc-900 p-1 border-zinc-500 border">
			<div
				data-testid="calculationDisplay"
				className="text-2xl text-zinc-700 text-right flex w-full justify-end gap-[2px] h-[1em]"
			>
				{calculationDisplayStack.map((v) => (
					<p>{v}</p>
				))}
			</div>
			<p
				data-testid="mainDisplay"
				className="text-5xl text-right"
			>
				{mainDisplayStack}
			</p>
			<div
				id="keypad"
				className="grid grid-cols-4 gap-1"
			>
				<Button
					onClick={handlePercentageButtonClick}
					disabled={isCalculationError}
				>
					%
				</Button>
				<ClearButton type="clearEntry" />
				<ClearButton type="clear" />
				<ClearButton type="backspace" />
				<Button disabled={isCalculationError}>1/x</Button>
				<Button disabled={isCalculationError}>x^2</Button>
				<Button disabled={isCalculationError}>2√x</Button>
				<OperatorButton operator="divide" />
				<NumberButton number="7" />
				<NumberButton number="8" />
				<NumberButton number="9" />
				<OperatorButton operator="multiply" />
				<NumberButton number="4" />
				<NumberButton number="5" />
				<NumberButton number="6" />
				<OperatorButton operator="subtract" />
				<NumberButton number="1" />
				<NumberButton number="2" />
				<NumberButton number="3" />
				<OperatorButton operator="add" />
				<Button
					onClick={handleSignChangeButtonClick}
					disabled={isCalculationError}
					styleType="numberKey"
				>
					+/-
				</Button>
				<NumberButton number="0" />
				<Button
					onClick={handleDecimalButtonClick}
					disabled={isCalculationError}
					styleType="numberKey"
				>
					.
				</Button>
				<EqualButton />
			</div>
		</div>
	)
}
