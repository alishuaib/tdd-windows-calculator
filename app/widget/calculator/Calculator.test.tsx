import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Calculator from "./Calculator"

describe("Calculator Widget", () => {
	it("number buttons should insert numbers to the display", () => {
		render(<Calculator />)
		const display = screen.getByTestId("display")

		let intendedDisplay = ""
		for (let i = 0; i <= 9; i++) {
			const numberButton = screen.getByRole("button", {
				name: i.toString(),
			})
			numberButton.click()
			intendedDisplay += i.toString()
			expect(display.textContent).toContain(intendedDisplay)
		}
	})
})
