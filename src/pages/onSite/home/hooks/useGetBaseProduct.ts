import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getBaseProduct } from 'services/onSite';
import { IBaseProduct } from 'services/onSite/interface';
import { queryKeyEnum } from 'utilities/enum';

export interface IBaseProductDTO extends IBaseProduct {
	isSelected: boolean;
}

export default function useGetBaseProduct() {
	const [baseProducts, setBaseProducts] = useState<IBaseProductDTO[]>([]);
	const { data, isLoading } = useQuery({
		queryKey: [queryKeyEnum.GET_ALL_BASE_PRODUCTS],
		queryFn: getBaseProduct,
	});

	useEffect(() => {
		if (data) {
			const baseProductDto: IBaseProductDTO[] = [];
			data.map((item) => baseProductDto.push({ ...item, isSelected: false }));
			setBaseProducts(baseProductDto);
		}
	}, [data]);

	const handleSelectBaseProduct = (uuid: string) => {
		console.log("uuid" , uuid  , baseProducts)
		const baseProductDto: IBaseProductDTO[] = [];
		baseProducts.map((item) => {
			if (item.base_uuid === uuid) {
				baseProductDto.push({ ...item, isSelected: !item.isSelected });
			} else {
				baseProductDto.push(item);
			}
		});
		setBaseProducts(baseProductDto);
	};

	return { baseProducts, isLoading, handleSelectBaseProduct };
}
