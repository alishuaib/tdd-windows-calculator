"use client"

export default function Calculator(props: {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
	children: React.ReactNode
}) {
	return (
		<button
			className="px-8 py-3 bg-gray-600 rounded-sm hover:bg-gray-500"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}
