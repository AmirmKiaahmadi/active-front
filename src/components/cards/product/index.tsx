import ProductImage from 'assets/images/test/mobl.png';
import TrashIcon from 'assets/images/icons/trash.svg';
import ArrowUp from 'assets/images/icons/arrow-up.svg';
import ClockIcon from 'assets/images/icons/clock.svg';
import PriceIcon from 'assets/images/icons/price.svg';
import CheckBoxIcon from 'assets/images/icons/checkbox.svg';
import {
	ICardItemPayload,
	IProductVariant,
	IProductVariantChild,
	IProductVariantChildToChild,
} from 'services/onSite/interface';
import useDebounce from 'utilities/hooks/useDebounce/useDebounce';
import { useEffect, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import classNames from 'classnames';
import formatDurationInJalali from 'utilities/helper/localCalender';

interface ICarItemProps {
	item: IProductVariantChild;
	handleMutate: (
		base_uuid: string,
		payload: IProductVariantChildToChild,
		count: number
	) => void;
	handleNewVariantMutate: (
		base_uuid: string,
		payload: number,
		squareCount: number
	) => void;
}

export default function CardItem({
	item,
	handleMutate,
	handleNewVariantMutate,
}: ICarItemProps) {
	const [count, setCount] = useState<number>(0);
	const [count2, setCount2] = useState<number>(0);
	const [squareCount, setSquareCount] = useState<number>(0);
	const [isOther, setIsOther] = useState<boolean>(false);
	const [isOther2, setIsOther2] = useState<boolean>(false);
	const [selectedVariant, setSelectedVariant] =
		useState<IProductVariantChildToChild>();
	const debouncedUuid = useDebounce(count, 500);
	const debouncedUuid2 = useDebounce(count2, 500);

	// useEffect(() => {
	// 	if (debouncedUuid && debouncedUuid === count) {
	// 		handleNewVariantMutate(item.base_uuid, debouncedUuid);
	// 	}
	// }, [debouncedUuid]);

	useEffect(() => {
		if (debouncedUuid2 && debouncedUuid2 === count2 && selectedVariant) {
			handleMutate(item.base_uuid, selectedVariant, count2);
		}
	}, [debouncedUuid2]);

	return (
		<div className=" rounded-xl border-2 border-gray2 p-2 ">
			<div className=" flex justify-between w-full items-center ">
				<div className=" flex gap-2 items-center">
					<img src={ProductImage} alt="product" className=" w-16" />
					<p>{item.base_name}</p>
				</div>
				<div className=" flex gap-2 items-center">
					{/* <img src={TrashIcon} className=" bg-gray2 p-1 rounded-md" /> */}
					<img src={ArrowUp} className=" bg-gray2 p-1 rounded-md" />
				</div>
			</div>
			<p className=" mx-2 my-2 font-bold">تعداد</p>
			<div className=" flex gap-2">
				{item.variants.map((variant) => (
					<p
						key={variant.variant_uuid}
						className={classNames(
							variant.variant_uuid === selectedVariant?.variant_uuid && !isOther
								? ' text-primary bg-gray2 p-2 rounded-md border border-green'
								: ' text-primary bg-gray2 p-2 rounded-md'
						)}
						onClick={() => {
							setIsOther2(true);
							setIsOther(false);
							setSelectedVariant(variant);
						}}
					>
						{variant.variant_name}
					</p>
				))}
				{item.other && (
					<p
						className={
							isOther
								? ' text-primary bg-gray2 p-2 rounded-md border border-green'
								: ' text-primary bg-gray2 p-2 rounded-md'
						}
						onClick={() => {
							setIsOther(true);
							setIsOther2(false);
						}}
					>
						سایر
					</p>
				)}
			</div>
			{isOther ? (
				<div className="">
					<div>
						<p>متر مربع</p>
						<div className=" flex justify-center text-center items-center">
							<div className=" flex items-center">
								<div
									className=" py-2 px-4 mx-1 rounded-md cursor-pointer bg-gray2 text-2xl"
									onClick={() => setSquareCount(squareCount + 1)}
								>
									+
								</div>
								<p className=" mx-2">{squareCount}</p>
								<div
									className="  py-2 px-5 mx-1 rounded-md cursor-pointer bg-gray2 text-3xl"
									onClick={() => {
										if (squareCount !== 0) {
											setSquareCount(squareCount - 1);
										}
									}}
								>
									-
								</div>
							</div>
						</div>
					</div>
					<div>
						<p>تعداد</p>
						<div className=" flex justify-center text-center items-center">
							<div className=" flex items-center">
								<div
									className=" py-2 px-4 mx-1 rounded-md cursor-pointer bg-gray2 text-2xl"
									onClick={() => setCount(count + 1)}
								>
									+
								</div>
								<p className=" mx-2">{count}</p>
								<div
									className="  py-2 px-5 mx-1 rounded-md cursor-pointer bg-gray2 text-3xl"
									onClick={() => {
										if (count !== 0) {
											setCount(count - 1);
										}
									}}
								>
									-
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
			{isOther2 ? (
				<>
					<p>تعداد</p>
					<div className=" flex justify-center text-center items-center">
						<div className=" flex items-center">
							<div
								className=" py-2 px-4 mx-1 rounded-md cursor-pointer bg-gray2 text-2xl"
								onClick={() => setCount2(count2 + 1)}
							>
								+
							</div>
							<p className=" mx-2">{count2}</p>
							<div
								className="  py-2 px-5 mx-1 rounded-md cursor-pointer bg-gray2 text-3xl"
								onClick={() => {
									if (count2 !== 0) {
										setCount2(count2 - 1);
									}
								}}
							>
								-
							</div>
						</div>
					</div>
				</>
			) : null}
			{item.variants && item.variants.length > 0 ? (
				<div>
					{item.variants.map((variant) => {
						if (variant.is_selected) {
							return (
								<>
									<p>در سبد خدمت</p>
									<p
										key={variant.variant_uuid}
										className="p-1 rounded-full mx-1 border px-2 border-primary text-primary inline-block"
									>
										{variant.variant_name}
									</p>
								</>
							);
						} else {
							return null;
						}
					})}
				</div>
			) : null}
			{item.base_total_duration ? (
				<div className=" my-2 flex justify-between items-center  ">
					<div className=" flex gap-2 items-center">
						<img
							src={ClockIcon}
							alt="clock"
							className=" p-1 rounded-full bg-gray2"
						/>
						<p>زمان تقریبی:</p>
					</div>
					<p>{formatDurationInJalali(item.base_total_duration)}</p>
				</div>
			) : null}
			{item.base_total_price ? (
				<div className=" my-2 flex justify-between items-center  ">
					<div className=" flex gap-2 items-center">
						<img
							src={PriceIcon}
							alt="clock"
							className=" p-1 rounded-full bg-gray2"
						/>
						<p>قیمت :</p>
					</div>
					<p>{item.base_total_price.toLocaleString()} هزار تومان</p>
				</div>
			) : null}
			{isOther ? (
				<button
					className=" w-full rounded-lg text-center border border-primary text-primary py-3"
					disabled={count === 0 && squareCount === 0}
					onClick={() => {
						if (count !== 0 && squareCount !== 0) {
							handleNewVariantMutate(
								item.base_uuid,
								debouncedUuid,
								squareCount
							);
						}
					}}
				>
					افزودن
				</button>
			) : null}
		</div>
	);
}
