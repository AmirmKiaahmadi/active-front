import PhoneIcon from 'assets/images/icons/phone-blue.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';

interface IOrganizationCallProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrganizationCall({
	setIsOpen,
}: IOrganizationCallProps) {
	return (
		<div className=" w-full overflow-hidden">
			<p className=" text-xl">برای سفارشات سازمانی با تلفن زیر تماس بگیرید</p>
			<div className=" flex justify-end items-center">
				<a
					href="tel::02192001212"
					className=" mx-2 text-blue text-2xl no-underline"
				>
					021 -92001212
				</a>
				<img className=" bg-gray p-2 rounded-md" src={PhoneIcon} alt="phone" />
			</div>
			<div
				className=" flex justify-center text-center w-full bg-blue text-white mt-4 py-2 rounded-md no-underline items-center cursor-pointer"
				onClick={() => setIsOpen(false)}
			>
				بازگشت
				<img
					src={ArrowRight}
					alt="right"
					className=" mx-1 bg-white rounded-full p-1"
				/>
			</div>
		</div>
	);
}
