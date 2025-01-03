import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProductVariants } from 'services/onSite';
import { useBaseProductIds } from 'store/baseProduct';
import { queryKeyEnum } from 'utilities/enum';

export default function useGetProductVariants() {
	const { baseProductIds } = useBaseProductIds();
	const { data, isLoading } = useQuery({
		queryKey: [queryKeyEnum.GET_PRODUCT_VARIANTS, baseProductIds],
		queryFn: getProductVariants,
	});
	return { data, isLoading };
}
