import { AppRouter } from './AppRouter';
import { ErrorFallback } from './ErrorFallback';
import './style.scss';
import '@fontsource/inter/variable.css';
import {
	LibraryContextProvider,
	Platform,
	RspcClient,
	QueryClient,
	rspc,
	PlatformProvider
} from '@sd/client';
import { QueryClientProvider, defaultContext } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

export interface Props {
	platform: Platform;
	rspcClient: RspcClient;
}

export default function SpacedriveInterface({ platform, rspcClient }: Props) {
	return (
		<rspc.Provider client={rspcClient} queryClient={queryClient}>
			<PlatformProvider platform={platform}>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<QueryClientProvider client={queryClient} contextSharing={true}>
						{/* The `context={defaultContext}` part is required for this to work on Windows. Why, idk, don't question it */}
						{import.meta.env.MODE === 'development' && (
							<ReactQueryDevtools position="bottom-right" context={defaultContext} />
						)}
						<MemoryRouter>
							<AppRouterWrapper />
						</MemoryRouter>
					</QueryClientProvider>
				</ErrorBoundary>
			</PlatformProvider>
		</rspc.Provider>
	);
}

// This can't go in `<SpacedriveInterface />` cause it needs the router context but it can't go in `<AppRouter />` because that requires this context
function AppRouterWrapper() {
	const navigate = useNavigate();

	return (
		<LibraryContextProvider onNoLibrary={() => navigate('/onboarding')}>
			<AppRouter />
		</LibraryContextProvider>
	);
}
