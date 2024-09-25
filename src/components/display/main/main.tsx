import { usePriceList } from '../../../api/usePriceList'
import { Navbar } from '../../common/navbar/navbar'
import { Filters } from './filters/filters'
import styles from './main.module.scss'
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
		<main className={styles.main}>
			<Navbar />
			<div className={styles.content}>
				<Filters
					price={price}
					onCategoryChange={onCategoryChange}
					onPriceChangeDebounced={onPriceChangeDebounced}
					togglePriceOrder={togglePriceOrder}
				/>
				<div className={styles.data}>
					{isLoading ? (
						<div className={styles.info}>Loading...</div>
					) : error ? (
						<div className='text-center'>{error}</div>
					) : filteredData.length ? (
						<div className={styles.elements}>
							{filteredData.map((el, i) => (
								<Wrapper description={el.description} key={i}>
									<PriceElement data={el} />
								</Wrapper>
							))}
						</div>
					) : (
						<div className={styles.info}>No items match the price criteria</div>
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
							className={styles.button}
						>
							{isMoreLoading ? 'Loading...' : 'Show more'}
						</button>
					)}
			</div>
		</main>
	)
}
