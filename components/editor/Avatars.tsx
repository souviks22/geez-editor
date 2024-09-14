import { useSelf, useOthers } from "@liveblocks/react"

export default function Avatars() {
  const current = useSelf()
  const others = useOthers()
  const users = [...others, current]

  return (<div className='flex py-3 mt-10'>
    {users.map((user, i) => (user?.info &&
      <div
        key={i}
        className='relative w-10 h-10 bg-slate-200 flex place-content-center border-2 border-white rounded-full -ml-3'
        data-tooltip={user.info.name}
      >
        <img
          src={user.info.picture}
          className='w-full h-full rounded-full'
          data-tooltip={user.info.name}
        />
      </div>
    ))}
  </div>)
}