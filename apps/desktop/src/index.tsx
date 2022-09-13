import { createClient } from '@rspc/client';
import { TauriTransport } from '@rspc/tauri';
import { OperatingSystem, Operations } from '@sd/client';
import SpacedriveInterface, { Platform } from '@sd/interface';
import '@sd/ui/style';
import { dialog, invoke, os } from '@tauri-apps/api';
import { listen } from '@tauri-apps/api/event';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const client = createClient<Operations>({
	transport: new TauriTransport()
});

async function getOs(): Promise<OperatingSystem> {
	switch (await os.type()) {
		case 'Linux':
			return 'linux';
		case 'Windows_NT':
			return 'windows';
		case 'Darwin':
			return 'macOS';
		default:
			return 'unknown';
	}
}

const platform: Platform = {
	platform: 'tauri',
	getThumbnailUrlById: (casId) => `spacedrive://thumbnail/${encodeURIComponent(casId)}`,
	openLink: open,
	getOs,
	openFilePickerDialog: () => dialog.open({ directory: true })
};

function App() {
	useEffect(() => {
		// This tells Tauri to show the current window because it's finished loading
		invoke('app_ready');

		// This is a hacky solution to run the action items in the macOS menu bar by executing their keyboard shortcuts in the DOM.
		// This means we can build shortcuts that work on web while calling them like native actions.
		const unlisten = listen('do_keyboard_input', (input) => {
			document.dispatchEvent(new KeyboardEvent('keydown', input.payload as any));
		});

		return () => {
			unlisten.then((unlisten) => unlisten());
		};
	}, []);

	return <SpacedriveInterface rspcClient={client} platform={platform} />;
}

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
