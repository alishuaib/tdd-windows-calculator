"use client"

import { useMemory } from "../context/MemoryContext"
import { useDisplay } from "../context/DisplayContext"
import { useEffect, useState } from "react"
import { Trash } from "@phosphor-icons/react"
import MemoryButton from "./MemoryButton"
export default function MemoryPanel() {
	const {
		isShowHistory,
		openMemoryHistoryPanel,
		setOpenMemoryHistoryPanel,
		clearHistory,
		setIsShowHistory,
	} = useDisplay()!
	const { memoryStack, ...handle } = useMemory()!

	useEffect(() => {
		if (memoryStack.length === 0) {
			setIsShowHistory(false)
		}
	}, [memoryStack])

	return (
		<div
			data-testid={`memoryHistoryDisplay`}
			className={`absolute w-full h-full left-0 bg-black/40 flex flex-col items-end transition-all ${
				openMemoryHistoryPanel ? "top-0" : "top-full"
			}`}
		>
			<span
				className="flex-1 cursor-pointer w-full"
				onClick={() => setOpenMemoryHistoryPanel(false)}
			/>
			<div className="h-2/3 w-full flex flex-col bg-neutral-800 rounded-t-lg pt-5 pb-2 px-1 ">
				{isShowHistory ? <HistoryList /> : <MemoryList />}
				<div
					className="cursor-pointer flex self-end mt-auto items-center justify-center h-fit w-fit aspect-square text-2xl text-neutral-100 p-1 hover:bg-neutral-700 rounded-sm"
					onClick={() => {
						if (isShowHistory) {
							clearHistory()
						} else {
							handle.clearMemoryStack()
						}
						setOpenMemoryHistoryPanel(false)
					}}
				>
					<button data-testid="deleteHistory">
						<Trash color="#ffffff" />
					</button>
				</div>
			</div>
		</div>
	)
}

function HistoryList() {
	const {
		historyStack,
		setMainDisplayStack,
		setCalculationStack,
		setIsCalculated,
	} = useDisplay()!
	return (
		<>
			{[...historyStack].reverse().map((value, index) => {
				return (
					<div
						data-testid={`historyItem${index}`}
						className="group cursor-pointer text-right text-2xl text-neutral-100 py-1 px-4 hover:bg-neutral-700 rounded-sm flex flex-col items-end gap-2"
						key={index}
						onClick={(event) => {
							if (event.target === event.currentTarget) {
								setIsCalculated(false)
								setCalculationStack([...value.calculation])
								setMainDisplayStack([...value.main])
								setIsCalculated(true)
							}
						}}
					>
						<div
							data-testid={`historyItem${index}Calculation`}
							className="text-sm text-neutral-400 text-right flex w-full justify-end gap-2 h-[1em]"
						>
							{value.calculation.map((v: string, i) => {
								function format$(v: string) {
									let index = v.indexOf("$")

									let firstPart = v.substring(0, index)
									let secondPart = v.substring(index + 1)

									if (secondPart.includes("$")) {
										secondPart = format$(secondPart)
									}
									return firstPart.replace(
										"x",
										`(${secondPart})`
									)
								}
								if (v.includes("$")) {
									v = format$(v)
								}
								return <p key={i}>{v}</p>
							})}
						</div>
						<p
							data-testid={`historyItem${index}Main`}
							className="text-xl text-right"
						>
							{value.main}
						</p>
					</div>
				)
			})}
		</>
	)
}

function MemoryList() {
	const { setMainDisplayStack } = useDisplay()!
	const { memoryStack } = useMemory()!
	return (
		<>
			{[...memoryStack].reverse().map((value, index) => {
				const itemButtonStyleOverride =
					"bg-neutral-600 hover:brightness-105 cursor-pointer py-1 px-2 round-md disabled:opacity-50"
				return (
					<div
						data-testid={`memoryItem${index}`}
						className="group cursor-pointer text-right text-2xl text-neutral-100 py-1 px-4 hover:bg-neutral-700 rounded-sm flex flex-col items-end gap-1"
						key={index}
						onClick={(event) => {
							if (event.target === event.currentTarget) {
								setMainDisplayStack([value.toString()])
							}
						}}
					>
						<p
							data-testid={`memoryItem${index}Text`}
							className="pointer-events-none"
						>
							{value}
						</p>
						<div className="opacity-0 group-hover:opacity-100 text-sm gap-1 flex ">
							<MemoryButton
								type="clear"
								index={memoryStack.length - 1 - index}
								styleOverride={itemButtonStyleOverride}
							/>
							<MemoryButton
								type="add"
								index={memoryStack.length - 1 - index}
								styleOverride={itemButtonStyleOverride}
							/>
							<MemoryButton
								type="subtract"
								index={memoryStack.length - 1 - index}
								styleOverride={itemButtonStyleOverride}
							/>
						</div>
					</div>
				)
			})}
		</>
	)
}
