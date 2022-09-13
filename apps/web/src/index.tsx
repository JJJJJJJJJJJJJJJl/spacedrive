import { WebsocketTransport, createClient } from '@rspc/client';
import { Operations } from '@sd/client';
import SpacedriveInterface, { Platform } from '@sd/interface';
import '@sd/ui/style';
import React from 'react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const client = createClient<Operations>({
	transport: new WebsocketTransport(
		import.meta.env.VITE_SDSERVER_BASE_URL || 'ws://localhost:8080/rspcws'
	)
});

const platform: Platform = {
	platform: 'web',
	getThumbnailUrlById: (casId) => `spacedrive://thumbnail/${encodeURIComponent(casId)}`,
	openLink: (url) => window.open(url, '_blank')?.focus(),
	demoMode: true
};

function App() {
	useEffect(() => window.parent.postMessage('spacedrive-hello', '*'), []);

	return <SpacedriveInterface rspcClient={client} platform={platform} />;
}

export default App;

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
