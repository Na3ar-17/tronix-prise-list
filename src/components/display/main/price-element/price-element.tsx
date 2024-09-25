import { IPriceItem } from '../../../../entities/price-item.entity'
interface IProps {
	data: IPriceItem
}

export const PriceElement = ({ data }: IProps) => {
	const { categories, name, price, id } = data
	return (
		<div className='w-full bg-zinc-800 cursor-pointer px-5 py-4 hover:transform hover:-translate-y-1 border-2 border-solid border-transparent transition-all duration-300 hover:border-indigo-700 rounded-md shadow-lg flex justify-between '>
			<div className='flex flex-col'>
				<p className='text-lg font-semibold'>{name}</p>
				<div className='flex items-center gap-3 mt-1'>
					{categories.map((el, i) => (
						<p
							className='text-sm  px-1.5 py-0.5 bg-zinc-600 text-gray-100 rounded-md'
							key={i}
						>
							{el}
						</p>
					))}
				</div>
			</div>

			<div className='flex items-center space-x-1'>
				<p className='text-gray-400 text-sm'>Price from</p>
				<p className='text-gray-100 text-md'>{price}$</p>
			</div>
		</div>
	)
}
