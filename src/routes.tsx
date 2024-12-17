import { onSiteRoutes } from 'pages/onSite/routes';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const routes = createBrowserRouter([
	{ path: '/', element: <Navigate replace to="/on-site/home" /> },
	...onSiteRoutes,
]);
