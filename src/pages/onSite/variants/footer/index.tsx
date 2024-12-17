import React from 'react';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import formatDurationInJalali from 'utilities/helper/localCalender';
import { IProductVariant } from 'services/onSite/interface';
import { UseMutateFunction } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface IFooterProps {
	time: number;
	price: number;
	data : IProductVariant | undefined
	mutate: UseMutateFunction<IProductVariant, Error, IProductVariant, unknown>

}

export default function Footer({ time, price , data , mutate }: IFooterProps) {
	const navigate = useNavigate()
	return (
		<div className=" bg-white p-3 shadow-[-1px_-15px_24px_-2px_rgba(0,_0,_0,_0.1)]">
			<div className=" flex justify-between my-4">
				<p>زمان تقریبی</p>
				<p>{formatDurationInJalali(time)}</p>
			</div>
			<div className=" flex justify-between my-4">
				<p>قیمت تقریبی</p>
				<p>{price.toLocaleString()} تومان </p>
			</div>
			<button disabled= {!data} onClick={() => {
				if(data){
					navigate("came-forward" , {state : {body : data}})
				}
			}} className="flex justify-center items-center text-center bg-blue text-white w-full p-2.5 rounded-md  ">
				ثبت و ادامه سفارش
				<img
					src={ArrowRight}
					alt="accept"
					className=" bg-white rounded-full p-1 mx-2"
				/>
			</button>
		</div>
	);
}
