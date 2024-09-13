import Image from "next/image"

export default function Loading() {
	return (<div className='absolute w-full h-screen top-0 left-0 z-20 bg-white flex justify-center items-center'>
		<section className='animate-ping'>
			<Image
				src={'/geez-logo.png'}
				alt='Geez'
				width={100}
				height={100}
				priority
			/>
		</section>
	</div>)
}