import React from 'react';

interface IOrderRequestProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderRequest({ setIsOpen }: IOrderRequestProps) {
	return (
		<>
			<div className=" mx-4 mt-3">
				<div className=" flex justify-between items-center">
					<p>انتخاب خدمت در محل</p>
					<div
						className=" py-2 px-3 rounded-md border border-primary text-primary cursor-pointer"
						onClick={() => setIsOpen(true)}
					>
						سفارش سازمانی
					</div>
				</div>
			</div>
		</>
	);
}
