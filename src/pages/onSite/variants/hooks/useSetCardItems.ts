import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import React from 'react';
import { setCardService } from 'services/onSite';
import { IProductVariant } from 'services/onSite/interface';

export default function useSetCardItems(
	setCards: React.Dispatch<React.SetStateAction<IProductVariant | undefined>>
) {
	const { mutate, isPending } = useMutation({
		mutationFn: setCardService,
		onSuccess: (value) => {
			console.log('value', value);
			setCards(value);
		},
		onError: () => {
			message.error('مشکلی در فرآیند محاسبه پیش آمد و لطفا دوباره تلاش کنید');
		},
	});
	return { mutate, isPending };
}
