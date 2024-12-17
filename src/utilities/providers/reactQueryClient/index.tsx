import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface IReactQueryClientProvider {
	children: React.ReactElement;
}
export default function ReactQueryClientProvider({
	children,
}: IReactQueryClientProvider) {
	const queryClient = new QueryClient({
		defaultOptions: {
			mutations: {
				retry: false,
			},
			queries: {
				refetchOnWindowFocus: true,
				retry: false,
			},
		},
	});
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
