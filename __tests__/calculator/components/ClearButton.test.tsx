import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

describe("Clearing button tests [CE,C,←]", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
		)
	})

	it("clear (C) button should clear calculation display and display (set to 0)", () => {
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
			const clearButton = screen.getByRole("button", { name: "C" })
			clearButton.click()
		})

		expect(mainDisplay.textContent).toBe("0")
		expect(calculationDisplay.textContent).toBe("")
	})

	// Clear entry button tests (CE)

	it("clear entry (CE) button should clear the display (set to 0) without changing calculation display", () => {
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
			const clearEntryButton = screen.getByRole("button", {
				name: "CE",
			})
			clearEntryButton.click()
		})

		expect(mainDisplay.textContent).toBe("0")
		expect(calculationDisplay.textContent).toBe("1+")
	})

	// Backspace button tests (←)
	it("backspace (←) button should remove the last character from the display", () => {
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
			const backspaceButton = screen.getByRole("button", {
				name: "←",
			})
			backspaceButton.click()
		})

		expect(mainDisplay.textContent).toBe("1")
	})
})
