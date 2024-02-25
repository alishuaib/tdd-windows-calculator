import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

describe("Memory button tests [MC,MR,M+,M-,M↓]", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
		)
	})

	it("Memory add (M+) button should insert the current number in the display to the memory after adding it to 0, only if no items in memory", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")

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
			const memoryAddButton = screen.getByRole("button", {
				name: "M+",
			})
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0")
		expect(mainDisplay.textContent).toBe("10")
		expect(memoryItem0.textContent).toBe("10")
	})
	it("Memory add (M+) button should add the current number in the display to the last number in memory", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")

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
			const memoryAddButton = screen.getByRole("button", {
				name: "M+",
			})
			memoryAddButton.click()
		})
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})
		act(() => {
			const memoryAddButton = screen.getByRole("button", {
				name: "M+",
			})
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0")
		expect(mainDisplay.textContent).toBe("5")
		expect(memoryItem0.textContent).toBe("15")
	})

	it("Memory subtract (M-) button should subtract the current number in the display from the last number in memory", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")

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
			const memoryAddButton = screen.getByRole("button", {
				name: "M-",
			})
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0")
		expect(mainDisplay.textContent).toBe("10")
		expect(memoryItem0.textContent).toBe("10")
	})
	it("Memory subtract (M-) button should insert the current number in the display from the memory after subtracting it from 0, only if no items in memory", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")

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
			const memoryAddButton = screen.getByRole("button", {
				name: "M-",
			})
			memoryAddButton.click()
		})
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})
		act(() => {
			const memoryAddButton = screen.getByRole("button", {
				name: "M-",
			})
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0")
		expect(mainDisplay.textContent).toBe("5")
		expect(memoryItem0.textContent).toBe("5")
	})
	it("Memory clear (MC) button should be disabled if no items in memory", () => {
		const memoryAddButton = screen.getByRole("button", {
			name: "MC",
		})
		expect(memoryAddButton).toBeDisabled()
	})
	it("Memory clear (MC) button should clear all items in memory", () => {
		const memoryAddButton = screen.getByRole("button", {
			name: "MC",
		})

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
			const memoryAddButton = screen.getByRole("button", {
				name: "M+",
			})
			memoryAddButton.click()
		})
		expect(memoryAddButton).toBeEnabled()
		act(() => {
			memoryAddButton.click()
		})
		expect(memoryAddButton).toBeDisabled()
	})

	it.todo(
		"Memory recall (MR) button should recall the last item in memory and display it"
	)
	it.todo(
		"Memory recall (MR) button should be disabled if no items in memory"
	)
	it.todo(
		"Memory store (M↓) button should display a list of all items in memory"
	)
	it.todo("Memory store (M↓) button should be disabled if no items in memory")
	it.todo(
		"Memory store (M↓) button should be display a list of all items in memory and allow user to delete items from memory"
	)
})
