import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import DisplayContext from "@/app/calculator/context/DisplayContext"
import { act } from "react-dom/test-utils"

describe("Operator button tests [+,-,×,÷]", () => {
	beforeEach(() => {
		render(
			<DisplayContext>
				<Calculator />
			</DisplayContext>
		)
	})

	describe("Reciprocal button tests [1/x]", () => {
		it("Reciprocal button should take the number in the display and calculate the reciprocal of the number then display the result", () => {
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
			expect(mainDisplay.textContent).toBe("0.1")
			expect(calculationDisplay.textContent).toBe("1/(10)")
		})
		it("Reciprocal button should nest the reciprocal of the number calculationDisplay if used in succession ( i.e 1/(1/(10)) )", () => {
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
				const reciprocalButton = screen.getByRole("button", {
					name: "1/x",
				})
				reciprocalButton.click()
			})

			expect(mainDisplay.textContent).toBe("10")
			expect(calculationDisplay.textContent).toBe("1/(1/(10))")
		})
		it("After a reciprocal, if number changes reset calculation", () => {
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
				const numberButtonTwo = screen.getByRole("button", {
					name: "2",
				})
				numberButtonTwo.click()
			})

			act(() => {
				const numberButtonZero = screen.getByRole("button", {
					name: "0",
				})
				numberButtonZero.click()
			})

			expect(mainDisplay.textContent).toBe("20")
			expect(calculationDisplay.textContent).toBe("")
		})
		it("After using a reciprocal operation, if an operator is clicked, add operator to calculation display", () => {
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

			expect(mainDisplay.textContent).toBe("0.1")
			expect(calculationDisplay.textContent).toBe("1/(10)+")
		})
		it("After a operator is clicked, the reciprocal should be added to the calculation display and shown on display", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			const calculationDisplay = screen.getByTestId("calculationDisplay")
			act(() => {
				const numberButtonOne = screen.getByRole("button", {
					name: "1",
				})
				numberButtonOne.click()
			})

			act(() => {
				const addButton = screen.getByRole("button", {
					name: "+",
				})
				addButton.click()
			})

			act(() => {
				const numberButtonOne = screen.getByRole("button", {
					name: "1",
				})
				numberButtonOne.click()
			})

			act(() => {
				const numberButtonZero = screen.getByRole("button", {
					name: "0",
				})
				numberButtonZero.click()
			})

			act(() => {
				const reciprocalButton = screen.getByRole("button", {
					name: "1/x",
				})
				reciprocalButton.click()
			})

			expect(mainDisplay.textContent).toBe("0.1")
			expect(calculationDisplay.textContent).toBe("1+1/(10)")

			act(() => {
				const addButton = screen.getByRole("button", {
					name: "+",
				})
				addButton.click()
			})

			expect(mainDisplay.textContent).toBe("1.1")
			expect(calculationDisplay.textContent).toBe("1.1+")
		})
	})

	describe("Square root button tests [√]", () => {
		it("Square root button should take the number in the display and calculate the square root of the number then display the result", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			const calculationDisplay = screen.getByTestId("calculationDisplay")
			act(() => {
				const numberButtonThree = screen.getByRole("button", {
					name: "3",
				})
				const numberButtonSix = screen.getByRole("button", {
					name: "6",
				})
				numberButtonThree.click()
				numberButtonSix.click()
			})

			act(() => {
				const squareRootButton = screen.getByRole("button", {
					name: "²√x",
				})
				squareRootButton.click()
			})
			expect(mainDisplay.textContent).toBe("6")
			expect(calculationDisplay.textContent).toBe("²√(36)")
		})
	})

	describe("Square button tests [x^2]", () => {
		it("Square button should take the number in the display and calculate the number squared then display the result", () => {
			const mainDisplay = screen.getByTestId("mainDisplay")
			const calculationDisplay = screen.getByTestId("calculationDisplay")
			act(() => {
				const numberButtonTwo = screen.getByRole("button", {
					name: "2",
				})
				numberButtonTwo.click()
			})

			act(() => {
				const squareButton = screen.getByRole("button", {
					name: "x²",
				})
				squareButton.click()
			})
			expect(mainDisplay.textContent).toBe("4")
			expect(calculationDisplay.textContent).toBe("(2)²")
		})
	})
})
