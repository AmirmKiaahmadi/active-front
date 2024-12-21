import AcceptIcon from 'assets/images/icons/accept.svg';
import { IBaseProductDTO } from '../hooks/useGetBaseProduct';
import { useBaseProductIds } from 'store/baseProduct';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

interface IFooterProps {
	baseProducts: IBaseProductDTO[];
}

export default function Footer({ baseProducts }: IFooterProps) {
	const { handleSetBaseProducts, baseProductIds } = useBaseProductIds();
	const navigate = useNavigate();
	const handleClick = () => {
		const findSelected = baseProducts.find((item) => item.isSelected);
		if (findSelected) {
			const selectedBaseProductIds: string[] = [];
			baseProducts.map(
				(item) => item.isSelected && selectedBaseProductIds.push(item.base_uuid)
			);
			handleSetBaseProducts(selectedBaseProductIds);
			navigate('/on-site/variants');
		} else{
			message.error("یکی از موارد زیر را انتخاب کنید")
		}
	};
	console.log("asdasd" , baseProductIds)
	return (
		<div className=" bg-white p-3 shadow-[-1px_-15px_24px_-2px_rgba(0,_0,_0,_0.1)]">
			<button
				className="flex justify-center items-center text-center bg-blue text-white w-full p-2.5 rounded-md  "
				onClick={handleClick}
				// disabled={baseProductIds.length === 0}
			>
				تایید و ادامه
				<img
					src={AcceptIcon}
					alt="accept"
					className=" bg-white rounded-full p-1 mx-2"
				/>
			</button>
		</div>
	);
}
