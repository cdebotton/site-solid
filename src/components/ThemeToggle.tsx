import { createServerAction$, json } from 'solid-start/server';

import Button from './Button';
import { useTheme } from './ThemeProvider';

import { storage } from '~/libs/storage';

export default function ThemeToggle() {
	let [action, { Form }] = createServerAction$(
		async (formData: FormData, { request }) => {
			let session = await storage.getSession(request.headers.get('Cookie'));
			session.set('mode', formData.get('mode'));
			return json('OK', {
				headers: {
					'Set-cookie': await storage.commitSession(session),
				},
			});
		},
		{ invalidate: ['mode'] },
	);

	let mode = useTheme();
	let nextMode = () => {
		return mode?.() === 'VAPORWAVE' ? 'EVA-02' : 'VAPORWAVE';
	};

	return (
		<Form>
			<input name="mode" type="hidden" value={nextMode()} />
			<Button type="submit" disabled={action.pending}>
				{mode?.()}
			</Button>
		</Form>
	);
}
