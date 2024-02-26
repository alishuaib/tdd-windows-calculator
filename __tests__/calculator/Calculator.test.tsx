import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

describe("Calculator Widget", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
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

	describe("Display Character Limits", () => {
		it("Number should be separated by commas after 3 digits", () => {
			"1234567890".split("").forEach((i) => {
				fireEvent.keyDown(window, { key: i })
			})
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent).toBe("1,234,567,890")
		})

		it("Decimal point should be displayed even if its the last character", () => {
			"0.".split("").forEach((i) => {
				fireEvent.keyDown(window, { key: i })
			})
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent).toBe("0.")
			fireEvent.keyDown(window, { key: "Escape" })
			"1111111111111111.".split("").forEach((i) => {
				fireEvent.keyDown(window, { key: i })
			})
			expect(mainDisplay.textContent).toBe("1,111,111,111,111,111.")
		})

		it("'Error' should be displayed if calculation error occurs", () => {
			fireEvent.keyDown(window, { key: "1" })
			fireEvent.keyDown(window, { key: "/" })
			fireEvent.keyDown(window, { key: "0" })
			fireEvent.keyDown(window, { key: "=" })
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent).toBe("Error")
		})

		it("Decimal limit should be 16 characters with 0. integer", () => {
			"0.111111111111111122222222222".split("").forEach((i) => {
				fireEvent.keyDown(window, { key: i })
			})
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent?.length).toEqual(18)
		})
		it("Decimal limit should be max 17 characters with 1. integer", () => {
			"1.111111111111111222222".split("").forEach((i) => {
				fireEvent.keyDown(window, { key: i })
			})
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent?.length).toEqual(17)
		})
		it("Display character limit should be 21 characters without decimal", () => {
			"1111111111111111".split("").forEach((i) => {
				fireEvent.keyDown(window, { key: i })
			})
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent?.length).toEqual(21)
		})
		it("Display character limit should be 21 characters with decimal", () => {
			"1111111111111.11111".split("").forEach((i) => {
				fireEvent.keyDown(window, { key: i })
			})
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent?.length).toEqual(21)
		})
	})
})
