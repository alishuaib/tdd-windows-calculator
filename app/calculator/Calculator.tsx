"use client"

import { useEffect, useRef, useState } from "react"
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
		mainDisplayFontSize,
		setMainDisplayFontSize,
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
		mainDisplayString,
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
			if (event.key == "h" && event.ctrlKey) {
				if (historyStack.length === 0) return
				setOpenMemoryHistoryPanel(true)
				setIsShowHistory(true)
			}
			if (event.key == "c" && event.ctrlKey) {
				navigator.clipboard.writeText(mainDisplayStack.join(""))
			}
			if (event.key == "v" && event.ctrlKey) {
				//Support for firefox like browsers (prevents reading from clipboard)
				if (navigator.clipboard.readText == undefined) {
					console.log("Clipboard read not supported")
					return
				}
				navigator.clipboard.readText().then((text) => {
					//Check if the clipboard contains a number
					if (isNaN(parseFloat(text))) return
					setMainDisplayStack([text])
				})
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

	const containerRef = useRef<HTMLParagraphElement>(null)
	useEffect(() => {
		if (containerRef.current !== null) {
			let isDisplayedContentOverflowingContainer =
				containerRef.current.scrollWidth >
				containerRef.current.clientWidth
			if (mainDisplayString.length <= 3) {
				setMainDisplayFontSize(2.8)
			} else if (isDisplayedContentOverflowingContainer) {
				// Decrease font size if content is too big
				setMainDisplayFontSize((prevValue) =>
					Math.max(prevValue - 0.2, 0)
				) // prevent font size from going below 0
			} else if (mainDisplayString.length < 21) {
				// Increase font size if content is too small
				setMainDisplayFontSize((prevValue) =>
					Math.min(prevValue + 0.2, 2.8)
				)
			}
		}
	}, [mainDisplayString])

	return (
		<div className="relative flex flex-col gap-4 bg-zinc-900 p-1 border-zinc-500 border overflow-hidden h-[560px] w-[320px]">
			<div className="flex items-center gap-2 pt-2 px-1">
				<div className="cursor-pointer flex self-end items-center justify-center h-fit w-fit aspect-square text-2xl text-neutral-100 p-1 hover:bg-neutral-700 rounded-sm">
					<button
						title="Open Github Repository"
						className="disabled:opacity-50"
						onClick={() => {
							open(
								"https://github.com/alishuaib/tdd-windows-calculator",
								"_blank"
							)
						}}
					>
						<GithubLogo color="#ffffff" />
					</button>
				</div>
				<p className="font-semibold text-xl">Standard</p>
				<div className="ml-auto cursor-pointer flex self-end items-center justify-center h-fit w-fit aspect-square text-2xl text-neutral-100 p-1 hover:bg-neutral-700 rounded-sm">
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
				className="text-2xl text-zinc-700 text-right flex w-full justify-end gap-[2px] h-[1em] flex-1"
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
				ref={containerRef}
				data-testid="mainDisplay"
				style={{ fontSize: `${mainDisplayFontSize}rem` }}
				className="text-right font-semibold h-min-[2.8rem] overflow-x-clip w-[310px]"
			>
				{mainDisplayString}
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
