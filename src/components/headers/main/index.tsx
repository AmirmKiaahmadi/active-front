import ProfileImage from 'assets/images/profile/image 5.png';
import LogoImage from 'assets/images/logo/logo.svg';
interface IHeaderProps {
	title: string;
}
export default function Header({ title }: IHeaderProps) {
	return (
		<>
			<div className=" bg-white w-full px-4 py-3 flex justify-between sticky top-0 z-10 items-center">
				<div className="flex">
					<img src={ProfileImage} className=" cursor-pointer" alt="logo" />
				</div>
				<p className=" text-primary text-xl ">{title}</p>
				<img src={LogoImage} alt="active logo" />
			</div>
		</>
	);
}
