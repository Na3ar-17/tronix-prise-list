import { PropsWithChildren, useState } from 'react'
import styles from './wrapper.module.scss'
interface IProps extends PropsWithChildren {
	description: string
}

export const Wrapper = ({ children, description }: IProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<div className='w-full'>
			<div onClick={() => setIsOpen(true)}>{children}</div>
			{isOpen && (
				<div className={styles.content}>
					<button
						onClick={() => setIsOpen(false)}
						className='absolute top-2 right-2'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='lucide lucide-x size-4'
						>
							<path d='M18 6 6 18' />
							<path d='m6 6 12 12' />
						</svg>
					</button>
					<p className='text-lg font-normal mt-3'>{description}</p>
				</div>
			)}
			{isOpen && <div className={styles.overlay}></div>}
		</div>
	)
}
