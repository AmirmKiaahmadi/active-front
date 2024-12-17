import OnSiteLayout from 'layout/onSite';
import { RouteObject } from 'react-router-dom';
import HomePage from './home';
import ProductVariantsPage from './variants';
import CameForward from './cameForward';

export const onSiteRoutes: RouteObject[] = [
	{
		path: '/on-site',
		element: <OnSiteLayout />,
		errorElement: <p>error page</p>,
		children: [
			{
				index: true,
				path: 'home',
				element: <HomePage />,
			},
			{
				index: false,
				path: 'variants',
				element: <ProductVariantsPage />,
			},
			{
				index : false,
				path: "variants/came-forward",
				element : <CameForward />
			}
		],
	},
];
