import "@testing-library/jest-dom"
import { render, screen, within } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

describe("History button test", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
		)
	})

	it("History button should display a list of all previous calculations", () => {
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

		expect(mainDisplay.textContent).toBe("20")
		expect(calculationDisplay.textContent).toBe("1+19=")

		const historyButton = screen.getByTitle("History (Ctrl+H)")
		act(() => {
			historyButton.click()
		})

		const historyItem0Main = screen.getByTestId("historyItem0Main")
		const historyItem0Calculation = screen.getByTestId(
			"historyItem0Calculation"
		)

		expect(historyItem0Main.textContent).toBe("20")
		expect(historyItem0Calculation.textContent).toBe("1+19=")
	})
	it("History button should be disabled if no previous calculations", () => {
		const historyButton = screen.getByTitle("History (Ctrl+H)")
		expect(historyButton).toBeDisabled()
	})
	it("History button should display a list of all previous calculations and allow user to delete items from history", () => {
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
		const historyButton = screen.getByTitle("History (Ctrl+H)")
		act(() => {
			historyButton.click()
		})
		const memoryHistoryDisplay = screen.getByTestId("memoryHistoryDisplay")
		act(() => {
			const memoryHistoryDeleteButton =
				within(memoryHistoryDisplay).getByTestId("deleteHistory")
			memoryHistoryDeleteButton.click()
		})
		expect(historyButton).toBeDisabled()
	})
	it("History button should display a list of all previous calculations and allow user to recall items from history", () => {
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
		const historyButton = screen.getByTitle("History (Ctrl+H)")
		act(() => {
			historyButton.click()
		})
		const historyItem0 = screen.getByTestId("historyItem0")
		act(() => {
			historyItem0.click()
		})

		const historyItem0Main = screen.getByTestId("historyItem0Main")
		const historyItem0Calculation = screen.getByTestId(
			"historyItem0Calculation"
		)

		expect(historyItem0Main.textContent).toBe("20")
		expect(historyItem0Calculation.textContent).toBe("1+19=")

		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		expect(mainDisplay.textContent).toBe("20")
		expect(calculationDisplay.textContent).toBe("1+19=")
	})
})
