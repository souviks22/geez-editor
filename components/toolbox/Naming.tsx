import { updateDocument } from "@/lib/update"
import { useError } from "@/hooks/use-error"

export default function Naming({ docId, current }: Readonly<{ docId: string, current: string }>) {
	const { catchError } = useError()
	const nameChangeHandler = catchError(async (event: any) => {
		await updateDocument({ docId, update: { title: event.target.innerText } })
	})
	return (<div className='max-w-48 text-lg'>
		<span
			contentEditable={true}
			className='px-2 py-1'
			onInput={nameChangeHandler}
			suppressContentEditableWarning={true}
		>
			{current}
		</span>
	</div>)
}