import SlateEditor from "@/components/editor/SlateEditor"
import Protect from "@/components/auth/Protect"

export default function Editor() {
  return (<main className='flex relative min-h-screen flex-col items-center justify-between'>
    <Protect />
    <section className='flex justify-center bg-gradient-radial from-aqua-green via-sky-300 to-crystal-blue w-full p-5 my-20'>
      <SlateEditor />
    </section>
  </main>)
}