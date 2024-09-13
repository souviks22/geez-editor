import { useState } from "react"
import { Visibility } from "@/types/model"
import { updateDocument } from "@/lib/update"

export default function Visiblity({ docId, visibility, onRefetch }: Readonly<{ docId: string, visibility: Visibility, onRefetch: () => void }>) {
    const [confirm, setConfirm] = useState<boolean>(false)
    const intendedVisibility = visibility === 'private' ? 'public' : 'private'
    const visibilityChangeHandler = async () => {
        await updateDocument({ docId, update: { visibility: intendedVisibility } })
        setConfirm(false)
        onRefetch()
    }

    return (<div>
        {confirm && <section className='absolute w-full h-screen top-0 left-0 flex justify-center items-center'>
            <div className='bg-slate-200 text-center rounded-xl p-10'>
                <p className='pb-10'>
                    <span>Do you want to change your document to be </span>
                    <span className='font-bold'>{intendedVisibility}</span>
                    <span>?</span>
                </p>
                <section className='flex text-sm justify-evenly'>
                    <button className='bg-white hover:bg-aqua-green w-20 p-2 rounded' onClick={visibilityChangeHandler}>Go</button>
                    <button className='bg-white hover:bg-red-400 w-20 p-2 rounded' onClick={() => setConfirm(false)}>Cancel</button>
                </section>
            </div>
        </section>}
        <span
            className='border text-sm rounded-xl px-2 py-1 cursor-pointer'
            onClick={() => setConfirm(true)}
        >
            {visibility}
        </span>
    </div>)
}