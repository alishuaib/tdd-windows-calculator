import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

describe("Number Button Tests", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
		)
	})

	// Number button tests (0-9)

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
