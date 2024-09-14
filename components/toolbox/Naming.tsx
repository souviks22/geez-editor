import { updateDocument } from "@/lib/update"
import { useError } from "@/hooks/use-error"

export default function Naming({ docId, current }: Readonly<{ docId: string, current: string }>) {
	const { catchError } = useError()
	const nameChangeHandler = catchError(async (event: any) => {
		await updateDocument({ docId, update: { title: event.target.innerText } })
	})
	return (<div className='text-xl'>
		<span
			contentEditable={true}
			className='max-w-10 px-2 py-1'
			onInput={nameChangeHandler}
			suppressContentEditableWarning={true}
		>
			{current}
		</span>
	</div>)
}