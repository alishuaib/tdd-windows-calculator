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

	// Number button tests (0-9)

	describe("Number button tests [0-9]", () => {
		it("number buttons should insert numbers to the display", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")

			act(() => {
				;[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((number) => {
					const numberButton = screen.getByRole("button", {
						name: number.toString(),
					})
					numberButton.click()
				})
			})

			// Check if the display value contains the concatenated numbers
			expect(mainDisplay.textContent).toBe("1234567890")
		})

		it("number buttons should not insert a leading zero to the display", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")

			act(() => {
				const zeroButton = screen.getByRole("button", { name: "0" })
				zeroButton.click()
			})

			expect(mainDisplay.textContent).toBe("0")
		})

		it("If the last button pressed was an operator, replace the display with the new number", () => {
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

			act(() => {
				const numberButtonTwo = screen.getByRole("button", {
					name: "2",
				})
				numberButtonTwo.click()
			})

			act(() => {
				const numberButtonThree = screen.getByRole("button", {
					name: "3",
				})
				numberButtonThree.click()
			})

			expect(mainDisplay.textContent).toBe("23")
		})
	})

	// it("number buttons should not insert a leading zero to the display", () => {
	//
	// 	const mainDisplay = screen.getByTestId("mainDisplay")

	// 	const zeroButton = screen.getByRole("button", { name: "0" })
	// 	zeroButton.click()
	// 	expect(mainDisplay.textContent).toBe("0")
	// })

	describe("Operator button tests [+,-,×,÷]", () => {
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

	describe("Clearing button tests [CE,C,←]", () => {
		// Clear button tests (C)

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

	describe("Equals button tests [=]", () => {
		it.todo(
			"(Add) Equals button should calculate the expression and display the result"
		)
		it.todo(
			"(Subtract) Equals button should calculate the expression and display the result"
		)
		it.todo(
			"(Multiply) Equals button should calculate the expression and display the result"
		)
		it.todo(
			"(Divide) Equals button should calculate the expression and display the result"
		)
		it.todo(
			"(Division by zero) Equals button should display an error message if the expression is invalid"
		)
	})

	describe("Decimal button tests [.]", () => {
		it.todo("Decimal button should insert a decimal point to the display")
		it.todo(
			"Decimal button should not insert a decimal point if one already exists in the display"
		)
	})

	describe("Sign button tests [+/-]", () => {
		it.todo(
			"Sign button should change the sign of the number in the display"
		)
		it.todo(
			"Sign button should not change the sign of the number in the display if it is 0"
		)
	})

	describe("Percentage calculation button tests [%]", () => {
		it.todo(
			"Percentage button should take the number in the display and convert it to a percentage calculation of the number in the calculation display"
		)
	})

	describe("Reciprocal button tests [1/x]", () => {
		it.todo(
			"Reciprocal button should take the number in the display and calculate the reciprocal of the number then display the result"
		)
		it.todo(
			"Reciprocal button should display the number in the display as a fraction in the calculation display ( i.e 1/(10) )"
		)
	})

	describe("Square root button tests [√]", () => {
		it.todo(
			"Square root button should take the number in the display and calculate the square root of the number then display the result"
		)
		it.todo(
			"Square root button should display the number in the display as a square root in the calculation display ( i.e √(36) )"
		)
	})

	describe("Square button tests [x^2]", () => {
		it.todo(
			"Square button should take the number in the display and calculate the number squared then display the result"
		)
		it.todo(
			"Square button should display the number in the display with the prefix 'sqr' in the calculation display ( i.e sqr(10) )"
		)
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
