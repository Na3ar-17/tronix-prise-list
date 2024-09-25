import { IPriceItem } from '../../../../entities/price-item.entity'
import styles from './price-element.module.scss'
interface IProps {
	data: IPriceItem
}

export const PriceElement = ({ data }: IProps) => {
	const { categories, name, price } = data
	return (
		<div className={styles.element}>
			<div className='flex flex-col'>
				<p className={styles.name}>{name}</p>
				<div className={styles.categories}>
					{categories.map((el, i) => (
						<p className={styles.category} key={i}>
							{el}
						</p>
					))}
				</div>
			</div>

			<div className={styles.price}>
				<p className='text-gray-400 text-sm'>Price from</p>
				<p className='text-gray-100 text-md'>{price}$</p>
			</div>
		</div>
	)
}
