import { Drawer } from 'antd';
import React from 'react';

interface IDrawerProps {
	show: boolean;
	onClose: () => void;
	placement: 'top' | 'right' | 'bottom' | 'left';
	children: React.ReactNode;
	title?: string;
	height?: string;
}

export default function CustomDrawer({
	show,
	onClose,
	placement,
	children,
	title,
	height,
}: IDrawerProps) {
	return (
		<Drawer
			title={title ?? ''}
			onClose={onClose}
			open={show}
			placement={placement}
			height={height ?? '375px'}
		>
			{children}
		</Drawer>
	);
}
