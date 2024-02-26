import "@testing-library/jest-dom"
import { render, screen, within } from "@testing-library/react"
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
			const memoryAddButton = screen.getByTitle("Memory add (Ctrl+P)")
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0Text")
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
			const memoryAddButton = screen.getByTitle("Memory add (Ctrl+P)")
			memoryAddButton.click()
		})
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})
		act(() => {
			const memoryAddButton = screen.getByTitle("Memory add (Ctrl+P)")
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0Text")
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
			const memoryAddButton = screen.getByTitle(
				"Memory subtract (Ctrl+Q)"
			)
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0Text")
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
			const memorySubtractButton = screen.getByTitle(
				"Memory subtract (Ctrl+Q)"
			)
			memorySubtractButton.click()
		})
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})
		act(() => {
			const memorySubtractButton = screen.getByTitle(
				"Memory subtract (Ctrl+Q)"
			)
			memorySubtractButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0Text")
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
			const memoryAddButton = screen.getByTitle("Memory add (Ctrl+P)")
			memoryAddButton.click()
		})
		expect(memoryAddButton).toBeEnabled()
		act(() => {
			memoryAddButton.click()
		})
		expect(memoryAddButton).toBeDisabled()
	})

	it("Memory recall (MR) button should be disabled if no items in memory", () => {
		const memoryAddButton = screen.getByRole("button", {
			name: "MR",
		})
		expect(memoryAddButton).toBeDisabled()
	})
	it("Memory recall (MR) button should recall the last item in memory and display it", () => {
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
			const memoryAddButton = screen.getByTitle("Memory add (Ctrl+P)")
			memoryAddButton.click()
		})
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})
		expect(mainDisplay.textContent).toBe("5")
		act(() => {
			const memoryAddButton = screen.getByRole("button", {
				name: "MR",
			})
			memoryAddButton.click()
		})
		const memoryItem0 = screen.getByTestId("memoryItem0Text")
		expect(mainDisplay.textContent).toBe("10")
		expect(memoryItem0.textContent).toBe("10")
	})
	it("Memory save (MS) button should save the current number in the display to the memory", () => {
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
				name: "MS",
			})
			memoryAddButton.click()
		})

		const memoryItem0 = screen.getByTestId("memoryItem0Text")
		expect(mainDisplay.textContent).toBe("10")
		expect(memoryItem0.textContent).toBe("10")
	})

	it("When using memory save (MS), top most memory item should be the latest save", () => {
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
				name: "MS",
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
				name: "MS",
			})
			memoryAddButton.click()
		})

		const memoryItem0 = screen.getByTestId("memoryItem0Text")
		const memoryItem1 = screen.getByTestId("memoryItem1Text")

		expect(mainDisplay.textContent).toBe("5")
		expect(memoryItem0.textContent).toBe("5")
		expect(memoryItem1.textContent).toBe("10")
	})

	it("With multiple memory items, Memory add (M+) button should only add displayed number to last item in memory", () => {
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
				name: "MS",
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
				name: "MS",
			})
			memoryAddButton.click()
		})

		act(() => {
			const memoryAddButton = screen.getByTitle("Memory add (Ctrl+P)")
			memoryAddButton.click()
		})

		const memoryItem0 = screen.getByTestId("memoryItem0Text")
		expect(memoryItem0.textContent).toBe("10")
	})
	it("Memory history (M↓) button should be disabled if no items in memory", () => {
		const memoryHistory = screen.getByRole("button", {
			name: "M↓",
		})
		expect(memoryHistory).toBeDisabled()
	})
	it("Memory history (M↓) button should display a list of all items in memory", () => {
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})

		act(() => {
			const memoryAddButton = screen.getByRole("button", {
				name: "MS",
			})
			memoryAddButton.click()
		})

		act(() => {
			const memoryHistory = screen.getByRole("button", {
				name: "M↓",
			})
			memoryHistory.click()
		})

		const memoryHistoryDisplay = screen.getByTestId("memoryHistoryDisplay")
		expect(memoryHistoryDisplay).toHaveClass("top-0")
	})
	it("Memory history display should allow recalling specific item on click", () => {
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
				name: "MS",
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
				name: "MS",
			})
			memoryAddButton.click()
		})

		act(() => {
			const memoryHistory = screen.getByRole("button", {
				name: "M↓",
			})
			memoryHistory.click()
		})

		act(() => {
			const memoryItemElement1 = screen.getByTestId("memoryItem1")
			memoryItemElement1.click()
		})

		const mainDisplay = screen.getByTestId("mainDisplay")
		expect(mainDisplay.textContent).toBe("10")
	})

	it("Memory history display should allow clearing all items by clicking trash icon", () => {
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
				name: "MS",
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
				name: "MS",
			})
			memoryAddButton.click()
		})

		const memoryHistory = screen.getByRole("button", {
			name: "M↓",
		})

		act(() => {
			memoryHistory.click()
		})

		const memoryHistoryDisplay = screen.getByTestId("memoryHistoryDisplay")
		act(() => {
			const memoryHistoryDeleteButton =
				within(memoryHistoryDisplay).getByTestId("deleteHistory")
			memoryHistoryDeleteButton.click()
		})

		expect(memoryHistory).toBeDisabled()
		expect(memoryHistoryDisplay).toHaveClass("top-full")
	})

	it("Items in Memory History should be removable with a MC button", () => {
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})

		act(() => {
			const memoryAddButton = screen.getByRole("button", {
				name: "MS",
			})
			memoryAddButton.click()
		})

		const memoryHistory = screen.getByRole("button", {
			name: "M↓",
		})

		act(() => {
			memoryHistory.click()
		})

		const memoryItemElement = screen.getByTestId("memoryItem0")
		act(() => {
			const memoryItem0ClearButton = within(memoryItemElement).getByRole(
				"button",
				{
					name: "MC",
				}
			)
			memoryItem0ClearButton.click()
		})
		expect(memoryHistory).toBeDisabled()
	})

	it("Items in memory history should be addable to with a M+ button", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})

		act(() => {
			const memoryAddButton = screen.getByRole("button", {
				name: "MS",
			})
			memoryAddButton.click()
		})

		act(() => {
			const memoryHistory = screen.getByRole("button", {
				name: "M↓",
			})
			memoryHistory.click()
		})

		const memoryItemElement = screen.getByTestId("memoryItem0")
		const memoryItem0AddButton = within(memoryItemElement).getByRole(
			"button",
			{
				name: "M+",
			}
		)
		act(() => {
			memoryItem0AddButton.click()
		})
		act(() => {
			memoryItem0AddButton.click()
		})

		const memoryItem0 = screen.getByTestId("memoryItem0Text")
		expect(memoryItem0.textContent).toBe("15")
		expect(mainDisplay.textContent).toBe("5")
	})

	it("Items in memory history should be addable to with a M- button", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		act(() => {
			const numberButtonFive = screen.getByRole("button", {
				name: "5",
			})
			numberButtonFive.click()
		})

		act(() => {
			const memoryAddButton = screen.getByRole("button", {
				name: "MS",
			})
			memoryAddButton.click()
		})

		act(() => {
			const memoryHistory = screen.getByRole("button", {
				name: "M↓",
			})
			memoryHistory.click()
		})

		const memoryItemElement = screen.getByTestId("memoryItem0")
		const memoryItem0SubtractButton = within(memoryItemElement).getByRole(
			"button",
			{
				name: "M-",
			}
		)
		act(() => {
			memoryItem0SubtractButton.click()
		})
		act(() => {
			memoryItem0SubtractButton.click()
		})

		const memoryItem0 = screen.getByTestId("memoryItem0Text")
		expect(memoryItem0.textContent).toBe("-5")
		expect(mainDisplay.textContent).toBe("5")
	})
})
