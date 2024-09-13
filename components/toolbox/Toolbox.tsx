import { useSlate } from "slate-react"
import { Document } from "@/types/model"

import Naming from "./Naming"
import Visiblity from "./Visibility"

export default function Toolbox({ document, onRefetch }: Readonly<{ document: Document, onRefetch: () => void }>) {
    const editor = useSlate()

    return (<div className='w-2/3 flex items-center bg-white z-10 p-2 rounded'>
        <section>
            <div className="flex space-x-2 items-center">
                <Visiblity docId={document._id} visibility={document.visibility} onRefetch={onRefetch} />
                <Naming docId={document._id} current={document.title} />
            </div>
        </section>
        <section>

        </section>
    </div>)
}