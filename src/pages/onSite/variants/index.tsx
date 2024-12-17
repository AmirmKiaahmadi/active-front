import React, { useEffect, useState } from 'react';
import useGetProductVariants from './hooks/useGetProductVariants';
import CardItem from 'components/cards/product';
import Header from 'components/headers/main';
import Loading from 'components/loading';
import Footer from './footer';
import useSetCardItems from './hooks/useSetCardItems';
import {
	IProductVariant,
	IProductVariantChild,
	IProductVariantChildToChild,
} from 'services/onSite/interface';

export default function ProductVariantsPage() {
	const [cards, setCards] = useState<IProductVariant | undefined>();
	const [selectedCards, setSelectedCards] = useState<IProductVariantChild[]>(
		[]
	);
	const { data, isLoading } = useGetProductVariants();
	const { mutate, isPending } = useSetCardItems(setCards);
	const [lastOfData , setLastOfData] = useState<IProductVariant | undefined>()

	useEffect(() => {
		if (data) {
			setCards(data);
			const newSelected: IProductVariantChild[] = [];
			data.items.map((item) => newSelected.push({ ...item, variants: [] }));
			setSelectedCards(newSelected);
		}
	}, [data]);

	const handleMutate = (
		base_uuid: string,
		payload: IProductVariantChildToChild,
		count: number
	) => {
		const newSelctedCard: IProductVariantChild[] = [];
		selectedCards.map((item) => {
			if (item.base_uuid === base_uuid) {
				const findVariant = item.variants.find(
					(v) => v.variant_uuid === payload.variant_uuid
				);
				if (findVariant) {
					const filterVariants = item.variants.filter(
						(v) => v.variant_uuid !== payload.variant_uuid
					);
					newSelctedCard.push({
						...item,
						variants: [...filterVariants, { ...payload, quantity: count }],
					});
				} else {
					newSelctedCard.push({
						...item,
						variants: [...item.variants, { ...payload, quantity: count }],
					});
				}
			} else {
				newSelctedCard.push(item);
			}
		});
		setSelectedCards(newSelctedCard);
		if (cards) {
			const newData: IProductVariant = {
				total_duration: cards?.total_duration,
				total_price: cards.total_price,
				items: newSelctedCard,
			};
			setLastOfData(newData)
			mutate(newData);
		}
	};

	const handleNewVariantMutate = (
		base_uuid: string,
		payload: number,
		squareCount: number
	) => {
		const newSelctedCard: IProductVariantChild[] = [];
		selectedCards.map((item) => {
			if (item.base_uuid === base_uuid) {
				console.log('item.new_variants', item);
				if (item.new_variants) {
					newSelctedCard.push({
						...item,
						new_variants: [
							...item.new_variants,
							{ variant_quantity: squareCount, quantity: payload },
						],
					});
				} else {
					newSelctedCard.push({
						...item,
						new_variants: [
							{ variant_quantity: squareCount, quantity: payload },
						],
					});
				}
			} else {
				newSelctedCard.push(item);
			}
		});
		setSelectedCards(newSelctedCard);
		if (cards) {
			const newData: IProductVariant = {
				total_duration: cards?.total_duration,
				total_price: cards.total_price,
				items: newSelctedCard,
			};
			setLastOfData(newData)
			mutate(newData);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className="flex flex-col h-full min-h-screen">
						<div className="flex-none w-full">
							<Header title="خدمت در محل" />
						</div>
						<div className=" grow">
							<div className="grid grid-cols-1 gap-4 items-center justify-center my-2 mx-2">
								{cards &&
									cards.items.map((item) => (
										<CardItem
											key={item.base_uuid}
											item={item}
											handleMutate={handleMutate}
											handleNewVariantMutate={handleNewVariantMutate}
										/>
									))}
							</div>
						</div>
						{cards && cards.total_duration && cards.total_price && (
							<div className="flex-none">
								<Footer time={cards.total_duration} price={cards.total_price} data = {lastOfData} mutate = {mutate} />
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
