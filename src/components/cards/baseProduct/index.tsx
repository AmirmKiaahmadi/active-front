import classNames from 'classnames';
import AcceptIcon from 'assets/images/icons/accept-white.svg';
import DisableIcon from 'assets/images/icons/disable-white.svg';

interface ICardItemProps {
	img: string;
	title: string;
	isSelected: boolean;
	handleClick: (id: string) => void;
	id: string;
}

export default function CardItem({
	img,
	title,
	isSelected,
	handleClick,
	id,
}: ICardItemProps) {
	return (
		<div
			className={classNames(
				'p-4 w-full rounded-lg flex flex-col justify-center items-center relative',
				isSelected ? '  border-2 border-green ' : ' bg-gray2 '
			)}
			onClick={() => handleClick(id)}
		>
			<img
				src={isSelected ? AcceptIcon : DisableIcon}
				alt="status"
				className={classNames(
					' absolute mx-2 my-1 top-0 left-0 p-1 rounded-full ',
					isSelected ? ' bg-green ' : ' bg-gray '
				)}
			/>
			<img src={img} alt="card item" />
			<p className={classNames(isSelected && 'text-gray')}>{title}</p>
		</div>
	);
}
