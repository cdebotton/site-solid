import { JSX } from 'solid-js';
import {
	A,
	Body,
	Head,
	Html,
	Meta,
	Outlet,
	Scripts,
	Title,
	useMatch,
	useRouteData,
} from 'solid-start';
import { createServerData$ } from 'solid-start/server';

// import Background from '~/components/Background';
import BackgroundWithRenderer from '~/components/BackgroundWithRenderer';
import Logo from '~/components/Logo';
import ThemeProvider from '~/components/ThemeProvider';
import ThemeToggle from '~/components/ThemeToggle';
import { storage } from '~/libs/storage';

export function routeData() {
	return {
		mode: createServerData$(
			async (_, { request }) => {
				let session = await storage.getSession(request.headers.get('Cookie'));

				return session.get('mode') ?? 'VAPORWAVE';
			},
			{ key: ['mode'] },
		),
	};
}

export default function PublicLayout() {
	let { mode } = useRouteData<typeof routeData>();

	return (
		<ThemeProvider value={mode}>
			<Html class="grid h-full" data-mode={mode()} lang="en">
				<Head>
					<Title>SolidStart - Bare</Title>
					<Meta charset="utf-8" />
					<Meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<Body class="vapor:bg-indigo-dark-1 vapor:text-plum-dark-12 eva:bg-red-1 eva:text-red-12">
					<BackgroundWithRenderer class="fixed inset-0 -z-10" />
					<div class="mx-auto grid h-full max-w-screen-lg grid-rows-[min-content_auto_min-content]">
						<header class="flex items-end gap-2 px-4 py-3">
							<A class="contents" href="/">
								<Logo />
							</A>
							<nav>
								<ul class="flex gap-4">
									<NavigationItem href="/code">Code</NavigationItem>
									<NavigationItem href="/photography">
										Photography
									</NavigationItem>
									<NavigationItem href="/about">About</NavigationItem>
									<NavigationItem href="/video">Video</NavigationItem>{' '}
								</ul>
							</nav>
						</header>
						<main class="px-4 pb-3">
							<Outlet />
						</main>
						<footer class="flex justify-end px-4 pb-3">
							<ThemeToggle />
						</footer>
					</div>
					<Scripts />
				</Body>
			</Html>
		</ThemeProvider>
	);
}

function NavigationItem(props: { href: string; children: JSX.Element }) {
	let active = useMatch(() => props.href);

	return (
		<li>
			<A
				class="font-semibold tracking-tighter"
				classList={{
					'eva:text-red-11 vapor:text-plum-dark-11': Boolean(active()),
				}}
				href={props.href}
			>
				{props.children}
			</A>
		</li>
	);
}
