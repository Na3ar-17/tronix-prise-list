import { ChangeEvent } from 'react'
import { categoriesData } from '../../../../data/categories.data'
import styles from './filters.module.scss'
interface IProps {
	onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void
	onPriceChangeDebounced: (e: ChangeEvent<HTMLInputElement>) => void
	price: number
	togglePriceOrder: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Filters = ({
	onCategoryChange,
	onPriceChangeDebounced,
	price,
	togglePriceOrder,
}: IProps) => {
	return (
		<div className={styles.filters}>
			<div className={styles.category}>
				<label className='text-gray-300 font-semibold mb-2'>
					Filter by Category
				</label>
				<select
					onChange={onCategoryChange}
					className='w-fit bg-zinc-700 text-gray-100 p-2 rounded-md'
				>
					<option value=''>All Categories</option>
					{categoriesData?.sort().map((el, i) => (
						<option key={i} value={el}>
							{el}
						</option>
					))}
				</select>
			</div>
			<div className={styles.price}>
				<label className='text-gray-300 font-semibold mb-2'>
					Sort by Price
				</label>
				<div className={styles.actions}>
					<div>
						<input
							type='range'
							id='price'
							name='price'
							min='1'
							max='2500'
							onChange={onPriceChangeDebounced}
							className='mr-4'
						/>
						<output className='w-[50px]'>{price}</output>
					</div>
					<select
						onChange={togglePriceOrder}
						className='w-48 bg-zinc-700 text-gray-100 p-2 rounded-md'
					>
						<option value='asc'>Low to High</option>
						<option value='desc'>High to Low</option>
					</select>
				</div>
			</div>
		</div>
	)
}
