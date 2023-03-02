import { createContext, createSignal, JSX, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import * as THREE from 'three';

import { insert } from './renderer';

type Root = {
	scene: THREE.Scene;
	camera: THREE.Camera | null;
};

let [root, setRoot] = createStore<Root>({
	scene: new THREE.Scene(),
	camera: null,
});

let RootContext = createContext(root);

export default function Canvas(props: {
	children?: JSX.Element;
	class?: string;
}) {
	let container: HTMLDivElement | undefined;
	let canvas: HTMLCanvasElement | undefined;

	onMount(() => {
		insert(
			root.scene,
			<RootContext.Provider value={root}>
				{props.children}
			</RootContext.Provider>,
		);
	});

	return (
		<div class={props.class} ref={container}>
			<canvas style={{ position: 'absolute', inset: 0 }} ref={canvas} />
		</div>
	);
}
