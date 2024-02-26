import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Calculator from "@/app/calculator/Calculator"
import ContextManager from "@/app/calculator/context/ContextManager"
import { act } from "react-dom/test-utils"

// Same as windows calculator key bindings
describe("Keyboard input tests", () => {
	beforeEach(() => {
		render(
			<ContextManager>
				<Calculator />
			</ContextManager>
		)
	})

	it("Keyboard input 0-9 should insert numbers to the display", () => {
		;["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].forEach(
			(number) => {
				fireEvent.keyDown(window, { key: number })
			}
		)
		const mainDisplay = screen.getByTestId("mainDisplay")
		expect(mainDisplay.textContent).toBe("1,234,567,890")
	})

	it("Keyboard input +,-,/,* should insert operators to the display", () => {
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		const mainDisplay = screen.getByTestId("mainDisplay")
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "+" })
		expect(calculationDisplay.textContent).toBe("1+")
		expect(mainDisplay.textContent).toBe("1")
		fireEvent.keyDown(window, { key: "2" })
		fireEvent.keyDown(window, { key: "-" })
		expect(calculationDisplay.textContent).toBe("3-")
		expect(mainDisplay.textContent).toBe("3")
		fireEvent.keyDown(window, { key: "2" })
		fireEvent.keyDown(window, { key: "/" })
		expect(calculationDisplay.textContent).toBe("1÷")
		expect(mainDisplay.textContent).toBe("1")
		fireEvent.keyDown(window, { key: "5" })
		fireEvent.keyDown(window, { key: "*" })
		expect(calculationDisplay.textContent).toBe("0.2×")
		expect(mainDisplay.textContent).toBe("0.2")
	})
	it("Keyboard input . should insert decimal points to the display", () => {
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "." })
		fireEvent.keyDown(window, { key: "2" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		expect(mainDisplay.textContent).toBe("1.2")
	})
	it("Keyboard input f9 should change the sign of the number in the display", () => {
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "f9" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		expect(mainDisplay.textContent).toBe("-1")
	})
	it("Keyboard input % should take the number in the display and convert it to a percentage calculation of the number in the calculation display", () => {
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "0" })
		fireEvent.keyDown(window, { key: "+" })
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "0" })
		fireEvent.keyDown(window, { key: "%" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		expect(mainDisplay.textContent).toBe("1")
		expect(calculationDisplay.textContent).toBe("10+1")
	})
	it("Keyboard input = and Enter should calculate the expression and display the result", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")

		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "+" })
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "=" })
		expect(mainDisplay.textContent).toBe("2")
		expect(calculationDisplay.textContent).toBe("1+1=")

		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "+" })
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "Enter" })
		expect(mainDisplay.textContent).toBe("2")
		expect(calculationDisplay.textContent).toBe("1+1=")
	})
	it("Keyboard input backspace should trigger backspace to the display", () => {
		fireEvent.keyDown(window, { key: "2" })
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "Backspace" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		expect(mainDisplay.textContent).toBe("2")
	})
	it("Keyboard input DELETE should clear current input (CE)", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "2" })
		expect(mainDisplay.textContent).toBe("12")
		fireEvent.keyDown(window, { key: "Delete" })
		expect(mainDisplay.textContent).toBe("0")
	})
	it("Keyboard input ESC should clear the display (C)", () => {
		const mainDisplay = screen.getByTestId("mainDisplay")
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "2" })
		fireEvent.keyDown(window, { key: "+" })
		fireEvent.keyDown(window, { key: "5" })
		expect(mainDisplay.textContent).toBe("5")
		fireEvent.keyDown(window, { key: "Escape" })
		expect(mainDisplay.textContent).toBe("0")
	})
	it("Keyboard input R should take the number in the display and calculate the reciprocal of the number then display the result", () => {
		fireEvent.keyDown(window, { key: "2" })
		fireEvent.keyDown(window, { key: "r" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		expect(mainDisplay.textContent).toBe("0.5")
		expect(calculationDisplay.textContent).toBe("1/(2)")
	})
	it("After Operator, Keyboard input R should take the number in the display and calculate the reciprocal of the number then display the result", () => {
		fireEvent.keyDown(window, { key: "1" })
		fireEvent.keyDown(window, { key: "0" })
		fireEvent.keyDown(window, { key: "+" })
		fireEvent.keyDown(window, { key: "r" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		expect(mainDisplay.textContent).toBe("0.1")
		expect(calculationDisplay.textContent).toBe("10+1/(10)")
	})
	it("Keyboard input @ should take the number in the display and calculate the square root of the number then display the result", () => {
		fireEvent.keyDown(window, { key: "4" })
		fireEvent.keyDown(window, { key: "@" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		expect(mainDisplay.textContent).toBe("2")
		expect(calculationDisplay.textContent).toBe("√(4)")
	})
	it("Keyboard input Q should take the number in the display and calculate the number squared then display the result", () => {
		fireEvent.keyDown(window, { key: "3" })
		fireEvent.keyDown(window, { key: "q" })
		const mainDisplay = screen.getByTestId("mainDisplay")
		const calculationDisplay = screen.getByTestId("calculationDisplay")
		expect(mainDisplay.textContent).toBe("9")
		expect(calculationDisplay.textContent).toBe("sqr(3)")
	})
	describe("Ctrl Keybinds", () => {
		it("Ctrl+M should store to memory (MS)", () => {
			fireEvent.keyDown(window, { key: "1" })
			fireEvent.keyDown(window, { key: "2" })
			fireEvent.keyDown(window, { key: "m", ctrlKey: true })
			const memoryItem0 = screen.getByTestId("memoryItem0Text")
			expect(memoryItem0.textContent).toBe("12")
		})
		it("Ctrl+P should add to memory (M+)", () => {
			fireEvent.keyDown(window, { key: "1" })
			fireEvent.keyDown(window, { key: "2" })
			fireEvent.keyDown(window, { key: "m", ctrlKey: true })
			const memoryItem0 = screen.getByTestId("memoryItem0Text")
			expect(memoryItem0.textContent).toBe("12")
			fireEvent.keyDown(window, { key: "3" })
			fireEvent.keyDown(window, { key: "p", ctrlKey: true })
			expect(memoryItem0.textContent).toBe("15")
		})
		it("Ctrl+Q should subtract to memory (M-)", () => {
			fireEvent.keyDown(window, { key: "1" })
			fireEvent.keyDown(window, { key: "2" })
			fireEvent.keyDown(window, { key: "m", ctrlKey: true })
			const memoryItem0 = screen.getByTestId("memoryItem0Text")
			expect(memoryItem0.textContent).toBe("12")
			fireEvent.keyDown(window, { key: "2" })
			fireEvent.keyDown(window, { key: "q", ctrlKey: true })
			expect(memoryItem0.textContent).toBe("10")
		})
		it("Ctrl+R should recall to memory (MR)", () => {
			fireEvent.keyDown(window, { key: "1" })
			fireEvent.keyDown(window, { key: "2" })
			fireEvent.keyDown(window, { key: "m", ctrlKey: true })
			const memoryItem0 = screen.getByTestId("memoryItem0Text")
			expect(memoryItem0.textContent).toBe("12")
			fireEvent.keyDown(window, { key: "Escape" })
			fireEvent.keyDown(window, { key: "r", ctrlKey: true })
			const mainDisplay = screen.getByTestId("mainDisplay")
			expect(mainDisplay.textContent).toBe("12")
		})
		it("Ctrl+L should clear to memory (MC)", () => {
			fireEvent.keyDown(window, { key: "1" })
			fireEvent.keyDown(window, { key: "2" })
			fireEvent.keyDown(window, { key: "m", ctrlKey: true })
			const memoryClearButton = screen.getByTitle(
				"Clear all memory (Ctrl+L)"
			)
			expect(memoryClearButton).toBeEnabled()
			fireEvent.keyDown(window, { key: "l", ctrlKey: true })
			expect(memoryClearButton).toBeDisabled()
		})
		it("Ctrl + H should open history display only if there is history", () => {
			const memoryHistoryDisplay = screen.getByTestId(
				"memoryHistoryDisplay"
			)
			fireEvent.keyDown(window, { key: "h", ctrlKey: true })
			expect(memoryHistoryDisplay).toHaveClass("top-full")
			fireEvent.keyDown(window, { key: "1" })
			fireEvent.keyDown(window, { key: "+" })
			fireEvent.keyDown(window, { key: "2" })
			fireEvent.keyDown(window, { key: "=" })
			fireEvent.keyDown(window, { key: "h", ctrlKey: true })
			expect(memoryHistoryDisplay).toHaveClass("top-0")
		})
	})
})
