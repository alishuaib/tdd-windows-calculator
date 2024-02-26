"use client"

import { useEffect, useState } from "react"
import Button from "./components/Button"
import OperatorButton from "./components/OperatorButton"
import AdvancedOperatorButton from "./components/AdvancedOperatorButton"
import NumberButton from "./components/NumberButton"
import ClearButton from "./components/ClearButton"
import EqualButton from "./components/EqualButton"
import MemoryButton from "./components/MemoryButton"
import MemoryPanel from "./components/HistoryPanel"
import { ClockCounterClockwise, GithubLogo } from "@phosphor-icons/react"
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
		historyStack,
		setOpenMemoryHistoryPanel,
		setIsShowHistory,
	} = useDisplay()!

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			switch (event.key) {
				case ".":
					handleDecimalButtonClick()
					break
				case "f9":
					handleSignChangeButtonClick()
					break
				case "%":
					handlePercentageButtonClick()
					break
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	})

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
		<div className="relative flex flex-col gap-4 bg-zinc-900 p-1 border-zinc-500 border overflow-hidden">
			<div className="flex justify-between pt-2 px-1">
				<div className="cursor-pointer flex self-end items-center justify-center h-fit w-fit aspect-square text-2xl text-neutral-100 p-1 hover:bg-neutral-700 rounded-sm">
					<button
						title="Open Github Repository"
						className="disabled:opacity-50"
						onClick={() => {
							open(
								"https://github.com/alishuaib/orbite",
								"_blank"
							)
						}}
					>
						<GithubLogo color="#ffffff" />
					</button>
				</div>
				<div className="cursor-pointer flex self-end items-center justify-center h-fit w-fit aspect-square text-2xl text-neutral-100 p-1 hover:bg-neutral-700 rounded-sm">
					<button
						title="History (Ctrl+H)"
						className="disabled:opacity-50"
						disabled={historyStack.length > 0 ? false : true}
						onClick={() => {
							setOpenMemoryHistoryPanel(true)
							setIsShowHistory(true)
						}}
					>
						<ClockCounterClockwise color="#ffffff" />
					</button>
				</div>
			</div>
			<div
				data-testid="calculationDisplay"
				className="text-2xl text-zinc-700 text-right flex w-full justify-end gap-[2px] h-[1em]"
			>
				{calculationDisplayStack.map((v: string, i) => {
					function format$(v: string) {
						let index = v.indexOf("$")

						let firstPart = v.substring(0, index)
						let secondPart = v.substring(index + 1)

						if (secondPart.includes("$")) {
							secondPart = format$(secondPart)
						}
						return firstPart.replace("x", `(${secondPart})`)
					}
					if (v.includes("$")) {
						v = format$(v)
					}
					return <p key={i}>{v}</p>
				})}
			</div>
			<p
				data-testid="mainDisplay"
				className="text-5xl text-right"
			>
				{mainDisplayStack}
			</p>
			<div className="flex flex-col gap-1">
				<div
					id="memoryPad"
					className="grid grid-cols-6 gap-1"
				>
					<MemoryButton type="clear" />
					<MemoryButton type="recall" />
					<MemoryButton type="add" />
					<MemoryButton type="subtract" />
					<MemoryButton type="save" />
					<MemoryButton type="history" />
				</div>
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
					<AdvancedOperatorButton operator="reciprocal" />
					<AdvancedOperatorButton operator="squareroot" />
					<AdvancedOperatorButton operator="square" />
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
			<MemoryPanel />
		</div>
	)
}
