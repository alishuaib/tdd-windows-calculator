import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

describe("Equals button tests [=]", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
		)
	})

	it("(Add) Equals button should calculate the expression and display the result", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", { name: "+" })
			addButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonNine = screen.getByRole("button", {
				name: "9",
			})
			numberButtonNine.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		expect(calculationDisplay.textContent).toBe("1+19=")
		expect(mainDisplay.textContent).toBe("20")
	})
	it("(Subtract) Equals button should calculate the expression and display the result", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const subtractButton = screen.getByRole("button", { name: "-" })
			subtractButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonNine = screen.getByRole("button", {
				name: "9",
			})
			numberButtonNine.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		expect(calculationDisplay.textContent).toBe("1-19=")
		expect(mainDisplay.textContent).toBe("-18")
	})
	it("(Multiply) Equals button should calculate the expression and display the result", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const multiplyButton = screen.getByRole("button", { name: "×" })
			multiplyButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonNine = screen.getByRole("button", {
				name: "9",
			})
			numberButtonNine.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		expect(calculationDisplay.textContent).toBe("1×19=")
		expect(mainDisplay.textContent).toBe("19")
	})
	it("(Divide) Equals button should calculate the expression and display the result", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const divideButton = screen.getByRole("button", { name: "÷" })
			divideButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonNine = screen.getByRole("button", {
				name: "9",
			})
			numberButtonNine.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		expect(calculationDisplay.textContent).toBe("1÷19=")
		expect(mainDisplay.textContent).toBe("0.0526315789473684")
	})
	it("(Division by zero) Equals button should display an error message if the expression is invalid", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const divideButton = screen.getByRole("button", { name: "÷" })
			divideButton.click()
		})

		act(() => {
			const numberButtonZero = screen.getByRole("button", {
				name: "0",
			})
			numberButtonZero.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		expect(calculationDisplay.textContent).toBe("1÷0=")
		expect(mainDisplay.textContent).toBe("Error")
	})
	it("(Reciprocal) Equals button should calculate the expression and display the result", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			const numberButtonZero = screen.getByRole("button", {
				name: "0",
			})
			numberButtonOne.click()
			numberButtonZero.click()
		})

		act(() => {
			const reciprocalButton = screen.getByRole("button", {
				name: "1/x",
			})
			reciprocalButton.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", {
				name: "+",
			})
			addButton.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		expect(mainDisplay.textContent).toBe("0.2")
		expect(calculationDisplay.textContent).toBe("1/(10)+0.1=")
	})
	it("If Error after calculation, only clear buttons should be enabled, after clear clicked all should reenable", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const divideButton = screen.getByRole("button", { name: "÷" })
			divideButton.click()
		})

		act(() => {
			const numberButtonZero = screen.getByRole("button", {
				name: "0",
			})
			numberButtonZero.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		expect(calculationDisplay.textContent).toBe("1÷0=")
		expect(mainDisplay.textContent).toBe("Error")

		const allButtons = screen.queryAllByRole("button")
		const disabledButtons = allButtons.filter(
			(button) =>
				button.textContent !== "C" &&
				button.textContent !== "CE" &&
				button.textContent !== "←" &&
				button.title !== "Open Github Repository" &&
				button.title !== "History (Ctrl+H)" &&
				button.dataset.testid !== "deleteHistory"
		)
		disabledButtons.forEach((button) => {
			expect(button).toBeDisabled()
		})
		;["C", "CE", "←"].forEach((number) => {
			const clearButton = screen.getByRole("button", {
				name: number.toString(),
			})
			expect(clearButton).toBeEnabled()
		})
	})
	it("After equal button is pressed, next number should clear the display and start a new calculation", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", { name: "+" })
			addButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonNine = screen.getByRole("button", {
				name: "9",
			})
			numberButtonNine.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "0",
			})
			numberButtonOne.click()
		})
		expect(calculationDisplay.textContent).toBe("")
		expect(mainDisplay.textContent).toBe("10")
	})

	it("After equal button is pressed, next operator should move calculated number and operator to calculation display", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", { name: "+" })
			addButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonNine = screen.getByRole("button", {
				name: "9",
			})
			numberButtonNine.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", { name: "+" })
			addButton.click()
		})

		expect(calculationDisplay.textContent).toBe("20+")
		expect(mainDisplay.textContent).toBe("20")

		act(() => {
			const subtractButton = screen.getByRole("button", { name: "-" })
			subtractButton.click()
		})

		expect(calculationDisplay.textContent).toBe("20-")
		expect(mainDisplay.textContent).toBe("20")
	})
	it("After equal button is pressed, clear buttons should reset both displays", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", { name: "+" })
			addButton.click()
		})

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonNine = screen.getByRole("button", {
				name: "9",
			})
			numberButtonNine.click()
		})

		act(() => {
			const equalButton = screen.getByRole("button", {
				name: "=",
			})
			equalButton.click()
		})

		act(() => {
			const clearButton = screen.getByRole("button", { name: "CE" })
			clearButton.click()
		})

		expect(calculationDisplay.textContent).toBe("")
		expect(mainDisplay.textContent).toBe("0")
	})
})
