"use client"

import { useState } from "react"
import Button from "./components/Button"
import OperatorButton from "./components/OperatorButton"
import NumberButton from "./components/NumberButton"
import { useDisplay } from "./context/DisplayContext"

export default function Calculator() {
	const { mainDisplayStack, calculationDisplayStack } = useDisplay()!

	return (
		<div className="flex flex-col gap-2">
			<p
				data-testid="calculationDisplay"
				className="text-md text-gray-500 h-10"
			>
				{calculationDisplayStack}
			</p>
			<p
				data-testid="mainDisplay"
				className="text-2xl h-10"
			>
				{mainDisplayStack}
			</p>
			<div
				id="keypad"
				className="grid grid-cols-4 gap-1"
			>
				<Button>%</Button>
				<Button>CE</Button>
				<Button>C</Button>
				<Button>←</Button>
				<Button>1/x</Button>
				<Button>x^2</Button>
				<Button>2√x</Button>
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
				<Button>+/-</Button>
				<NumberButton number="0" />
				<Button>.</Button>
				<Button>=</Button>
			</div>
		</div>
	)
}
