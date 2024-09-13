import { useState, useEffect } from "react"

export default function Format({ icon, active, label, shortcut, onClick }: Readonly<{
	icon: React.ReactNode, active?: boolean, label: string, shortcut: string, onClick: () => void
}>) {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [timer, setTimer] = useState<NodeJS.Timeout>()

	const mouseEnterHandler = () => {
		const newTimer = setTimeout(() => setIsHovered(true), 1500)
		setTimer(newTimer)
	}

	const mouseLeaveHandler = () => {
		clearTimeout(timer)
		setIsHovered(false)
	}

	const formatHandler = (event: React.MouseEvent) => {
		event.preventDefault()
		onClick()
	}

	useEffect(() => {
		return () => clearTimeout(timer)
	}, [timer])

	return (<div className='relative hover:shadow'>
		<div
			className={`text-sm ${active && 'bg-gray-200'} border rounded cursor-pointer p-1`}
			onMouseDown={formatHandler}
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}
		>
			{icon}
		</div>
		{isHovered && <section className='absolute w-24 text-xs bg-slate-100 rounded-lg border p-1 transition-transform mt-1'>
			<p className='py-1'>{label}</p>
			<p>
				<span>Ctrl + </span>
				<span className='bg-white p-0.5 rounded border'>{shortcut}</span>
			</p>
		</section>}
	</div>)
}