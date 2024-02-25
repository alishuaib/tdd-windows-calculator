"use client"

interface ButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	styleType?: "numberKey" | "operationKey" | "equalKey"
	disabled?: boolean
	children: React.ReactNode
}

export default function Button(props: ButtonProps) {
	const { styleType = "operationKey", disabled = false } = props
	const styleDefault = "px-6 py-3 rounded-sm disabled:opacity-50 text-xl"
	const style = {
		numberKey: "bg-neutral-700 hover:bg-neutral-800",
		operationKey: "bg-neutral-800 hover:bg-neutral-700",
		equalKey: "bg-sky-300 hover:bg-sky-400 text-zinc-900 ",
	}

	return (
		<button
			disabled={disabled}
			className={style[styleType].concat(" ", styleDefault)}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}
