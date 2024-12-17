import { Spin } from 'antd';

export default function Loading() {
	return (
		<div className="flex justify-center text-center">
			<Spin className=" text-primary" />
		</div>
	);
}
