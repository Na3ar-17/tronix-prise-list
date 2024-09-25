import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { IPriceItem } from '../entities/price-item.entity'

type TypePriceOrder = 'desc' | 'asc'

export const usePriceList = () => {
	const url = `https://66f2c3d971c84d8058769f01.mockapi.io/api/list/lists`

	const [data, setData] = useState<IPriceItem[] | undefined>(undefined)
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false)
	const [category, setCategory] = useState<string>('')
	const [price, setPrice] = useState<number>(1)
	const [priceOrder, setPriceOrder] = useState<TypePriceOrder>('asc')
	const [limit, setLimit] = useState<number>(12)

	const debounce = (
		callback: (e: ChangeEvent<HTMLInputElement>) => void,
		delay: number
	) => {
		let timer: number
		return function (e: ChangeEvent<HTMLInputElement>) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				callback(e)
			}, delay)
		}
	}

	const takeMore = (number: number) => {
		setLimit(prev => prev + number)
	}
	const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value)
	}
	const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPrice(+e.target.value)
	}
	const onPriceChangeDebounced = debounce(onPriceChange, 300)

	const togglePriceOrder = (e: ChangeEvent<HTMLSelectElement>) => {
		setPriceOrder(e.target.value as TypePriceOrder)
	}
	const getData = async () => {
		if (!data?.length) {
			setIsLoading(true)
		}
		await axios
			.get<IPriceItem[]>(url, {
				params: {
					page: 1,
					limit: price > 1 ? 40 : limit,
					search: category,
					orderBy: 'price',
					order: priceOrder,
				},
			})
			.then(({ data }) => setData(data))
			.catch(err => setError(err.message))
			.finally(() => {
				setIsLoading(false)
				setIsMoreLoading(false)
			})
	}
	useEffect(() => {
		if (data?.length) {
			setIsMoreLoading(true)
		}
	}, [limit, priceOrder, price])

	useEffect(() => {
		getData()
	}, [limit, category, priceOrder, price])

	return {
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
	}
}
