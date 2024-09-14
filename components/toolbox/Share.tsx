import { useState } from "react"
import { useError } from "@/hooks/use-error"
import { IoMdShare } from "react-icons/io"
import { CollabRole } from "../editor/CollabEditor"
import { Visibility } from "@/types/model"
import { grantPermission } from "@/lib/update"

import CopyLink from "./CopyLink"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function Share({ docId, visibility }: Readonly<{ docId: string, visibility: Visibility }>) {
	const [share, setShare] = useState<boolean>(false)
	const [focus, setFocus] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [role, setRole] = useState<CollabRole>('viewer')
	const [emailError, setEmailError] = useState<boolean>(false)
	const { catchError } = useError()
	const emailChangeHandler = (event: any) => {
		const current = event.target.value
		setEmailError(!emailRegex.test(current))
		setEmail(current)
	}
	const shareHandler = catchError(async () => {
		await grantPermission({ docId, email, role })
		setShare(false)
	}, () => setShare(false))

	return (<div>
		<div
			className='relative flex items-center group hover:bg-slate-100 hover:rounded cursor-pointer p-1'
			onClick={() => setShare(true)}
		>
			<IoMdShare size={20} />
			<p className='text-sm absolute bg-slate-100 group-hover:block hidden rounded p-1 left-6'>Share</p>
		</div>
		{share && <section className='absolute w-full h-screen top-0 left-0 flex justify-center items-center'>
			<div className='w-2/5 relative flex flex-col bg-slate-200 rounded-xl p-10 space-y-5'>
				<CopyLink />
				{visibility === 'private' && < section className='relative flex flex-col'>
					{focus && <label className='absolute bottom-9'>Email</label>}
					<input type='email' value={email} placeholder={focus ? '' : 'Enter his/her email'}
						onChange={emailChangeHandler}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						className={`${emailError && 'outline-red-500'} px-2 py-1 rounded`}
					/>
				</section>}
				<section className='flex space-x-3'>
					<select value={role}
						onChange={event => setRole(event.target.value as CollabRole)}
						className='px-2 py-1 h-fit rounded cursor-pointer'
						disabled={visibility === 'public'}
					>
						<option value='viewer'>Viewer</option>
						<option value='editor'>Editor</option>
					</select>
					<p>
						{visibility === 'public' ? 'Anyone can view this document'
							: role === 'viewer' ? 'Only selected people can view this document' :
								'Only selected people can edit this document'
						}
					</p>
				</section>
				<section className='flex text-sm justify-evenly pt-5'>
					<button className='bg-white hover:bg-aqua-green w-20 p-2 rounded' onClick={shareHandler}>Share</button>
					<button className='bg-white hover:bg-red-400 w-20 p-2 rounded' onClick={() => setShare(false)}>Cancel</button>
				</section>
			</div>
		</section >
		}
	</div >)
}