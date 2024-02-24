import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "./Calculator"

describe("Calculator Widget", () => {
	// Number button tests (0-9)
	it("number buttons should insert numbers to the display", () => {
		render(<Calculator />)
		const mainDisplay = screen.getByTestId("mainDisplay")

		let intendedDisplay = ""
		for (let i = 0; i <= 9; i++) {
			const numberButton = screen.getByRole("button", {
				name: i.toString(),
			})
			numberButton.click()
			intendedDisplay += i.toString()
			expect(mainDisplay.textContent).toContain(intendedDisplay)
		}
	})

	describe("Clearing button tests [CE,C,←]", () => {
		// Clear button tests (C)

		it.todo(
			"clear (C) button should clear calculation display and display (set to 0)"
		)

		// Clear entry button tests (CE)

		it.todo("clear entry (CE) button should clear the display (set to 0)")

		it.todo(
			"clear entry (CE) button should clear the display (set to 0) without clearing calculation display"
		)

		// Backspace button tests (←)
		it.todo(
			"backspace (←) button should remove the last character from the display"
		)
	})

	describe("Operator button tests [+,-,×,÷]", () => {
		it.todo(
			"Add button should move display to calculation display and insert +"
		)
		it.todo(
			"Subtract button should move display to calculation display and insert -"
		)
		it.todo(
			"Multiply button should move display to calculation display and insert ×"
		)
		it.todo(
			"Divide button should move display to calculation display and insert ÷"
		)
		it.todo(
			"Operator button should replace the last operator if one exists in calculation display"
		)
		it.todo(
			"Operator button should keep last number in display after moving to calculation display"
		)
		it.todo(
			"Operator button after inputting a second number should calculate the expression and display the result"
		)
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
