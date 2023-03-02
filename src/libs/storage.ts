import { createCookieSessionStorage } from 'solid-start';

export let storage = createCookieSessionStorage({
	cookie: {
		name: 'cdb.session',
		secure: process.env.NODE_ENV === 'production',
		secrets: [import.meta.env.VITE_SESSION_SECRET],
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30, // 30 days
		httpOnly: true,
	},
});
