import { ChangeEvent } from 'react'
import { categoriesData } from '../../../../data/categories.data'

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
		<div className='w-[90%] mx-auto flex px-6 py-3 justify-between items-center bg-zinc-800 rounded-md'>
			<div className='flex flex-col'>
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
			<div>
				<div className='flex flex-col items-center'>
					<label className='text-gray-300 font-semibold mb-2'>
						Sort by Price
					</label>
					<div className='flex items-center gap-5'>
						<input
							type='range'
							id='price'
							name='price'
							min='1'
							max='2500'
							onChange={onPriceChangeDebounced}
						/>
						<output className='w-[50px]'>{price}</output>
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
		</div>
	)
}
