import { Canvas } from '~/libs/three';

export default function BackgroundWithRenderer() {
	return (
		<Canvas>
			<mesh>
				<boxGeometry />
			</mesh>
		</Canvas>
	);
}
