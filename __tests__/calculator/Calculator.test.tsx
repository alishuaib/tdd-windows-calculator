import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import DisplayContext from "@/app/calculator/context/DisplayContext"
import { act } from "react-dom/test-utils"

describe("Calculator Widget", () => {
	beforeEach(() => {
		render(
			<DisplayContext>
				<Calculator />
			</DisplayContext>
		)
	})

	describe("Decimal button tests [.]", () => {
		it("Decimal button should insert a decimal point to the display", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			act(() => {
				const decimalButton = screen.getByRole("button", {
					name: ".",
				})
				decimalButton.click()
			})
			expect(mainDisplay.textContent).toBe("0.")
		})
		it("Decimal button should not insert a decimal point if one already exists in the display", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			act(() => {
				const decimalButton = screen.getByRole("button", {
					name: ".",
				})
				decimalButton.click()
				decimalButton.click()
			})
			expect(mainDisplay.textContent).toBe("0.")
		})
		it("After operator button is pressed, decimal button should insert a 0.", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			const calculationDisplay = screen.getByTestId("calculationDisplay")
			act(() => {
				const addButton = screen.getByRole("button", {
					name: "+",
				})
				const decimalButton = screen.getByRole("button", {
					name: ".",
				})
				addButton.click()
				decimalButton.click()
			})
			expect(mainDisplay.textContent).toBe("0.")
			expect(calculationDisplay.textContent).toBe("0+")
		})
		it("After equal button is pressed, decimal button should insert a 0.", () => {
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
			act(() => {
				const decimalButton = screen.getByRole("button", {
					name: ".",
				})
				decimalButton.click()
			})
			expect(mainDisplay.textContent).toBe("0.")
		})
	})

	describe("Sign button tests [+/-]", () => {
		it("Sign button should change the sign of the number in the display", () => {
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
				const signButton = screen.getByRole("button", {
					name: "+/-",
				})
				signButton.click()
			})
			expect(mainDisplay.textContent).toBe("-10")
		})
		it("Sign button should not change the sign of the number in the display if it is 0", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			act(() => {
				const signButton = screen.getByRole("button", {
					name: "+/-",
				})
				signButton.click()
			})
			expect(mainDisplay.textContent).toBe("0")
		})
		it("After operator button is pressed, sign button should change the sign of the number in the display", () => {
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
				const addButton = screen.getByRole("button", {
					name: "+",
				})
				addButton.click()
			})
			act(() => {
				const signButton = screen.getByRole("button", {
					name: "+/-",
				})
				signButton.click()
			})
			expect(mainDisplay.textContent).toBe("-10")
			expect(calculationDisplay.textContent).toBe("10+")
		})
		it("After equal button is pressed, sign button should change the sign of the number in the display and clear calculation display", () => {
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
			act(() => {
				const signButton = screen.getByRole("button", {
					name: "+/-",
				})
				signButton.click()
			})
			expect(mainDisplay.textContent).toBe("-20")
			expect(calculationDisplay.textContent).toBe("")
		})
	})

	describe("Percentage calculation button tests [%]", () => {
		it("Percentage button should take the number in the display and convert it to a percentage calculation of the number in the calculation display", () => {
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
				const addButton = screen.getByRole("button", {
					name: "+",
				})
				addButton.click()
			})
			act(() => {
				const percentageButton = screen.getByRole("button", {
					name: "%",
				})
				percentageButton.click()
			})
			expect(mainDisplay.textContent).toBe("1")
			expect(calculationDisplay.textContent).toBe("10+1")
		})

		it("After equal button is pressed, percentage button should calculate the percentage of displayed number by answer (10+10=20 -> 20%20=4)", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			const calculationDisplay = screen.getByTestId("calculationDisplay")

			const numberButtonOne = screen.getByRole("button", {
				name: "1",
			})
			const numberButtonZero = screen.getByRole("button", {
				name: "0",
			})

			act(() => {
				numberButtonOne.click()
				numberButtonZero.click()
			})

			expect(mainDisplay.textContent).toBe("10")
			expect(calculationDisplay.textContent).toBe("")

			act(() => {
				const addButton = screen.getByRole("button", {
					name: "+",
				})
				addButton.click()
			})

			expect(mainDisplay.textContent).toBe("10")
			expect(calculationDisplay.textContent).toBe("10+")

			act(() => {
				const equalButton = screen.getByRole("button", {
					name: "=",
				})
				equalButton.click()
			})

			expect(mainDisplay.textContent).toBe("20")
			expect(calculationDisplay.textContent).toBe("10+10=")

			act(() => {
				const percentageButton = screen.getByRole("button", {
					name: "%",
				})
				percentageButton.click()
			})

			expect(mainDisplay.textContent).toBe("4")
			expect(calculationDisplay.textContent).toBe("4")
		})
	})

	describe("Memory button tests [MC,MR,M+,M-,M↓]", () => {
		it.todo("Memory clear (MC) button should clear all items in memory")
		it.todo(
			"Memory clear (MC) button should be disabled if no items in memory"
		)
		it.todo(
			"Memory recall (MR) button should recall the last item in memory and display it"
		)
		it.todo(
			"Memory recall (MR) button should be disabled if no items in memory"
		)
		it.todo(
			"Memory add (M+) button should add the current number in the display to the last number in memory"
		)
		it.todo(
			"Memory add (M+) button should insert the current number in the display to the memory after adding it to 0, only if no items in memory"
		)
		it.todo(
			"Memory subtract (M-) button should subtract the current number in the display from the last number in memory"
		)
		it.todo(
			"Memory subtract (M-) button should insert the current number in the display from the memory after subtracting it from 0, only if no items in memory"
		)
		it.todo(
			"Memory store (M↓) button should display a list of all items in memory"
		)
		it.todo(
			"Memory store (M↓) button should be disabled if no items in memory"
		)
		it.todo(
			"Memory store (M↓) button should be display a list of all items in memory and allow user to delete items from memory"
		)
	})

	describe("History button test", () => {
		it.todo(
			"History button should display a list of all previous calculations"
		)
		it.todo("History button should be disabled if no previous calculations")
		it.todo(
			"History button should display a list of all previous calculations and allow user to delete items from history"
		)
		it.todo(
			"History button should display a list of all previous calculations and allow user to recall items from history"
		)
	})

	describe("Github button test", () => {
		it.todo(
			"Github button should open a new tab with the github repository"
		)
	})

	// Same as windows calculator key bindings
	describe("Keyboard input tests", () => {
		it.todo("Keyboard input 0-9 should insert numbers to the display")
		it.todo("Keyboard input +,-,/,* should insert operators to the display")
		it.todo("Keyboard input . should insert decimal points to the display")
		it.todo(
			"Keyboard input backspace should trigger backspace to the display"
		)
		it.todo(
			"Keyboard input = should calculate the expression and display the result"
		)
		it.todo("Keyboard input DELETE should clear the display")
		it.todo(
			"Keyboard input % should take the number in the display and convert it to a percentage calculation of the number in the calculation display"
		)
		it.todo(
			"Keyboard input R should take the number in the display and calculate the reciprocal of the number then display the result"
		)
		it.todo(
			"Keyboard input @ should take the number in the display and calculate the square root of the number then display the result"
		)
		it.todo(
			"Keyboard input Q should take the number in the display and calculate the number squared then display the result"
		)
	})
})
