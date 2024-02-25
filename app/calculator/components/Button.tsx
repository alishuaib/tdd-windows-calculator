"use client"

interface ButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	styleType?: "numberKey" | "operationKey" | "equalKey"
	children: React.ReactNode
}

export default function Button(props: ButtonProps) {
	const { styleType = "numberKey" } = props
	const style = {
		numberKey: "px-8 py-3 bg-gray-600 rounded-sm hover:bg-gray-500",
		operationKey: "px-8 py-3 bg-gray-700 rounded-sm hover:bg-gray-600",
		equalKey: "px-8 py-3 bg-blue-500 rounded-sm hover:bg-blue-400",
	}

	return (
		<button
			className={style[styleType]}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}
