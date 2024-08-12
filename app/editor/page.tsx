import SlateEditor from "@/components/editor/SlateEditor"
import Protect from "@/components/auth/Protect"

export default function Editor() {
  return (<main className='flex relative min-h-screen flex-col items-center justify-between'>
    <Protect />
    <section className='flex justify-center bg-gradient-radial from-indigo-400 via-sky-300 to-blue-200 w-full p-5 my-20'>
      <SlateEditor docId='12345' editorId='12345' role='public' />
    </section>
  </main>)
}