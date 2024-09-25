import { usePriceList } from '../../../api/usePriceList'
import { Navbar } from '../../common/navbar/navbar'
import { Filters } from './filters/filters'
import { PriceElement } from './price-element/price-element'
import { Wrapper } from './wrapper/wrapper'

export const Main = () => {
	const {
		data,
		error,
		isLoading,
		isMoreLoading,
		takeMore,
		onCategoryChange,
		category,
		onPriceChangeDebounced,
		price,
		togglePriceOrder,
	} = usePriceList()
	const filteredData = data?.filter(el => el.price >= price) || []
	return (
		<main className='pb-[100px]'>
			<Navbar />
			<div className='mt-8'>
				<Filters
					price={price}
					onCategoryChange={onCategoryChange}
					onPriceChangeDebounced={onPriceChangeDebounced}
					togglePriceOrder={togglePriceOrder}
				/>
				<div className='mt-5'>
					{isLoading ? (
						<div className='flex justify-center text-xl font-bold'>
							Loading...
						</div>
					) : error ? (
						<div className='text-center text-red-500'>{error}</div>
					) : filteredData.length ? (
						<div className='grid grid-cols-2 gap-5 mx-auto place-items-center w-[90%]'>
							{filteredData.map((el, i) => (
								<Wrapper description={el.description} key={i}>
									<PriceElement data={el} />
								</Wrapper>
							))}
						</div>
					) : (
						<div className='flex justify-center text-xl font-bold'>
							No items match the price criteria
						</div>
					)}
				</div>
				{data?.length &&
					data.length !== 40 &&
					!isLoading &&
					!category &&
					price === 1 && (
						<button
							disabled={isMoreLoading}
							onClick={() => takeMore(12)}
							className='px-3 py-2 rounded-md disabled:opacity-80 disabled:cursor-not-allowed transition-all duration-200 hover:bg-opacity-80 active:bg-indigo-800 active:scale-95 bg-indigo-600 text-lg font-semibold block mx-auto mt-10'
						>
							{isMoreLoading ? 'Loading...' : 'Show more'}
						</button>
					)}
			</div>
		</main>
	)
}
