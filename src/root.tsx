// @refresh reload
import { Suspense } from 'solid-js';
import { ErrorBoundary, FileRoutes, Routes } from 'solid-start';
import './root.css';

export default function Root() {
	return (
		<Suspense>
			<ErrorBoundary>
				<Routes>
					<FileRoutes />
				</Routes>
			</ErrorBoundary>
		</Suspense>
	);
}
