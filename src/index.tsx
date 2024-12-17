import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import ReactQueryClientProvider from 'utilities/providers/reactQueryClient';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ReactQueryClientProvider>
			<RouterProvider router={routes} />
		</ReactQueryClientProvider>
	</React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
