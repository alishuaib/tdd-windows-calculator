import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

describe("Operator button tests [+,-,×,÷]", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
		)
	})

	it("Add button should move display to calculation display and insert +", () => {
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

		expect(calculationDisplay.textContent).toBe("1+")
	})
	it("Subtract button should move display to calculation display and insert -", () => {
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

		expect(calculationDisplay.textContent).toBe("1-")
	})
	it("Multiply button should move display to calculation display and insert ×", () => {
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

		expect(calculationDisplay.textContent).toBe("1×")
	})
	it("Divide button should move display to calculation display and insert ÷", () => {
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

		expect(calculationDisplay.textContent).toBe("1÷")
	})
	it("Multiple numbers should move from display to calculation display and insert operator", () => {
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		const mainDisplay = screen.getByTestId("mainDisplay")

		act(() => {
			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			numberButtonOne.click()
		})

		act(() => {
			const numberButtonTwo = screen.getByRole("button", {
				name: "2",
			})
			numberButtonTwo.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", { name: "+" })
			addButton.click()
		})

		expect(calculationDisplay.textContent).toBe("12+")
		expect(mainDisplay.textContent).toBe("12")
	})
	it("Operator button should replace the last operator if one exists in calculation display", () => {
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
			const subtractButton = screen.getByRole("button", { name: "-" })
			subtractButton.click()
		})

		expect(calculationDisplay.textContent).toBe("1-")
		expect(mainDisplay.textContent).toBe("1")
	})
	it("Operator button should keep last number in display after moving to calculation display", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")

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

		expect(mainDisplay.textContent).toBe("1")
	})
	it("Operator button after inputting a second number should calculate the expression and display the result", () => {
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
			const numberButtonTwo = screen.getByRole("button", {
				name: "2",
			})
			numberButtonTwo.click()
		})

		act(() => {
			const addButton = screen.getByRole("button", { name: "+" })
			addButton.click()
		})

		expect(mainDisplay.textContent).toBe("3")
		expect(calculationDisplay.textContent).toBe("3+")
	})
})
