import Drawer from 'components/drawer';
import Header from 'components/headers/main';
import { useState } from 'react';
import OrganizationCall from './orgCall';
import OrderRequest from './orderRequest';
import Footer from './footer';
import CardItem from 'components/cards/baseProduct';
import ImageSample from 'assets/images/test/mobl.png';
import useGetBaseProduct from './hooks/useGetBaseProduct';
import Loading from 'components/loading';

export default function HomePage() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { baseProducts, isLoading, handleSelectBaseProduct } =
		useGetBaseProduct();
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
							<OrderRequest setIsOpen={setIsOpen} />
							<div className="grid grid-cols-2 gap-4 items-center justify-center my-2 mx-2">
								{baseProducts.map((item) => (
									<CardItem
										key={item.base_uuid}
										isSelected={item.isSelected}
										title={item.base_name}
										// img={`https://newapp.acleaner.ir${item.image}`}
										img={ImageSample}
										handleClick={handleSelectBaseProduct}
										id={item.base_uuid}
									/>
								))}
							</div>
						</div>

						<div className="flex-none">
							<Footer baseProducts={baseProducts} />
						</div>
					</div>
					<Drawer
						show={isOpen}
						onClose={() => setIsOpen(false)}
						placement="bottom"
						height="250px"
					>
						<OrganizationCall setIsOpen={setIsOpen} />
					</Drawer>
				</>
			)}
		</>
	);
}
