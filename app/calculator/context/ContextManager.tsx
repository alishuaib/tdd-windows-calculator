"use client"

import DisplayProvider from "./DisplayContext"
import MemoryProvider from "./MemoryContext"

export default function ContextManager(props: { children: React.ReactNode }) {
	return (
		<DisplayProvider>
			<MemoryProvider>{props.children}</MemoryProvider>
		</DisplayProvider>
	)
}
