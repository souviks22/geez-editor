import { useState } from "react"
import { IoLink } from "react-icons/io5"

export default function CopyLink({ className }: Readonly<{ className?: string }>) {
  const [copied, setCopied] = useState(false)
  const copyToClipboardHandler = async () => {
    const url = window.location.href
    await window.navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (<div
    className={`flex justify-center hover:bg-slate-300 p-1 cursor-pointer rounded-full ${className}`}
    onClick={copyToClipboardHandler}
  >
    <IoLink size={20} />
    {copied && <p className='absolute bottom-8 text-white bg-slate-700 p-2 text-xs rounded'>
      Copied
    </p>}
  </div>)
}