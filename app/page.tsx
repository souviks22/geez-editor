import SlateEditor from "@/components/editor/SlateEditor"

export default function Home() {
  return (<main className='flex min-h-screen flex-col items-center justify-between p-24'>
    <section className="w-full bg-indigo-400 px-48 py-5">
      <SlateEditor />
    </section>
  </main>)
}